import React, { useState } from 'react';
import { useStore } from '../../services/store';
import { AppointmentStatus } from '../../types';
import Button from '../../components/Button';
import { Calendar, Check, X, LogOut, Clock, User, Filter } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { appointments, doctors, services, updateAppointmentStatus, isAuthenticated, loginAdmin, logoutAdmin } = useStore();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [filter, setFilter] = useState<AppointmentStatus | 'ALL'>('ALL');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">Staff Portal</h2>
          <form onSubmit={(e) => { e.preventDefault(); if(loginForm.password === 'admin') loginAdmin(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" className="mt-1 w-full p-2 border rounded-lg" defaultValue="admin" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                className="mt-1 w-full p-2 border rounded-lg" 
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Use 'admin'"
              />
            </div>
            <Button type="submit" fullWidth>Login</Button>
          </form>
        </div>
      </div>
    );
  }

  const filteredAppointments = filter === 'ALL' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  const stats = {
    pending: appointments.filter(a => a.status === AppointmentStatus.PENDING).length,
    confirmed: appointments.filter(a => a.status === AppointmentStatus.CONFIRMED).length,
    today: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
             <span className="bg-primary-500 text-white px-2 py-0.5 rounded text-sm">ADMIN</span>
             SmileCare Dashboard
          </div>
          <button onClick={logoutAdmin} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Requests</p>
              <p className="text-3xl font-bold text-orange-500">{stats.pending}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg"><Clock className="text-orange-500" /></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Confirmed</p>
              <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg"><Check className="text-green-600" /></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
              <p className="text-sm text-gray-500 font-medium">Today's Appointments</p>
              <p className="text-3xl font-bold text-blue-600">{stats.today}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg"><Calendar className="text-blue-600" /></div>
          </div>
        </div>

        {/* Appointment List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900">Appointments</h3>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              {(['ALL', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Service / Doctor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No appointments found.</td>
                  </tr>
                ) : (
                  filteredAppointments.map(apt => {
                    const doc = doctors.find(d => d.id === apt.doctorId);
                    const srv = services.find(s => s.id === apt.serviceId);
                    
                    return (
                      <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{apt.patientName}</div>
                          <div className="text-xs text-gray-500">{apt.patientPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{apt.date}</div>
                          <div className="text-xs text-gray-500">{apt.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{srv?.title}</div>
                          <div className="text-xs text-gray-500">w/ {doc?.name}</div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                             ${apt.status === AppointmentStatus.CONFIRMED ? 'bg-green-100 text-green-700' : 
                               apt.status === AppointmentStatus.PENDING ? 'bg-orange-100 text-orange-700' :
                               apt.status === AppointmentStatus.CANCELLED ? 'bg-red-100 text-red-700' : 
                               'bg-gray-100 text-gray-700'}`}>
                             {apt.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {apt.status === AppointmentStatus.PENDING && (
                              <>
                                <button 
                                  onClick={() => updateAppointmentStatus(apt.id, AppointmentStatus.CONFIRMED)}
                                  className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100" 
                                  title="Approve"
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  onClick={() => updateAppointmentStatus(apt.id, AppointmentStatus.CANCELLED)}
                                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100" 
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            )}
                             {apt.status === AppointmentStatus.CONFIRMED && (
                                <button 
                                  onClick={() => updateAppointmentStatus(apt.id, AppointmentStatus.COMPLETED)}
                                  className="text-xs text-blue-600 hover:underline" 
                                >
                                  Mark Complete
                                </button>
                             )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;