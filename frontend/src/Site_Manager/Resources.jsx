import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Search,
  Package,
  Wrench,
  Truck,
  Hammer,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';
import RequestResource from './RequestResource';

const Resources = ({ currentProject }) => {
  const projectId = currentProject?.project_id;

  const [showRequest, setShowRequest] = useState(false);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    if (!projectId) {
      setResources([]);
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token')

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/resources`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: `Application/json`
          }
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.resources || [];

      setResources(data);
    } catch (error) {
      console.error('Resources error:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [projectId]);

  const getStatus = (resource) => {
    if (
      resource.status === 'out_of_stock' ||
      Number(resource.quantity) <= 0
    ) {
      return {
        label: 'Out of Stock',
        bg: 'bg-red-50',
        color: 'text-red-600'
      };
    }

    if (resource.status === 'damaged') {
      return {
        label: 'Damaged',
        bg: 'bg-red-50',
        color: 'text-red-600'
      };
    }

    if (resource.status === 'in_use') {
      return {
        label: 'In Use',
        bg: 'bg-blue-50',
        color: 'text-blue-600'
      };
    }

    return {
      label: 'Available',
      bg: 'bg-green-50',
      color: 'text-green-600'
    };
  };

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'equipment':
        return <Wrench className="w-6 h-6 text-blue-600" />;
      case 'tool':
        return <Hammer className="w-6 h-6 text-orange-500" />;
      case 'vehicle':
        return <Truck className="w-6 h-6 text-purple-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  const filteredResources = resources.filter((resource) => {
    const value = search.toLowerCase();

    return (
      resource.name?.toLowerCase().includes(value) ||
      resource.type?.toLowerCase().includes(value) ||
      resource.status?.toLowerCase().includes(value) ||
      resource.supplier?.toLowerCase().includes(value)
    );
  });

  if (!currentProject) {
    return (
      <div className="max-w-[1180px] mx-auto min-h-[650px] flex items-center justify-center bg-[#F7F8FA]">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Package className="w-7 h-7 text-blue-500" />
          </div>

          <h2 className="text-lg font-bold text-gray-900">
            No project selected
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Select a project from the header to view its resources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1180px] mx-auto min-h-[calc(100vh-120px)] bg-[#F7F8FA] font-sans">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-start gap-3">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-1 w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Project Resources
              </span>
            </div>

            <h1 className="text-2xl font-black text-gray-900">
              Resources
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Manage materials, equipment, tools and vehicles.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={fetchResources}
            disabled={loading}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition shadow-sm"
            title="Refresh"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            />
          </button>

          <button
            type="button"
            onClick={() => setShowRequest(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        </div>
      </div>

      {/* Project Summary */}
      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 mb-5">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Current Project
            </p>

            <h2 className="text-sm font-bold text-gray-900 mt-1">
              {currentProject?.project_name ||

                'Unnamed Project'}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Total Resources
            </p>

            <p className="text-xl font-black text-gray-900">
              {resources.length}
            </p>
          </div>

        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">
        <div className="relative max-w-md">

          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

        </div>
      </div>

      {/* Resources */}
      {loading ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-20 flex flex-col items-center justify-center">
          <RefreshCw className="w-7 h-7 text-blue-500 animate-spin mb-3" />
          <p className="text-sm text-gray-400">
            Loading resources...
          </p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-20 text-center">

          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Package className="w-8 h-8 text-gray-300" />
          </div>

          <p className="text-gray-500 text-sm font-bold">
            {search ? 'No resources found' : 'No resources yet'}
          </p>

          <p className="text-gray-400 text-xs mt-1">
            {search
              ? 'Try another search term.'
              : 'Add materials, equipment or tools to this project.'}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() => setShowRequest(true)}
              className="mt-4 text-blue-600 text-sm font-bold hover:text-blue-700"
            >
              + Add your first resource
            </button>
          )}

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {filteredResources.map((resource) => {
            const status = getStatus(resource);

            return (
              <div
                key={resource.id}
                className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4 min-w-0">

                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                      {getIcon(resource.type)}
                    </div>

                    <div className="min-w-0">

                      <h3 className="font-bold text-gray-900 text-sm truncate">
                        {resource.name || 'Unnamed Resource'}
                      </h3>

                      <p className="text-xs text-gray-400 font-semibold mt-1 capitalize">
                        {resource.type || 'Resource'}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        <span className="font-semibold text-gray-700">
                          {resource.quantity ?? 0}
                        </span>{' '}
                        {resource.unit || 'unit'}
                      </p>

                    </div>
                  </div>

                  <div className="text-right shrink-0">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${status.bg} ${status.color}`}
                    >
                      {status.label}
                    </span>

                    {resource.supplier && (
                      <p className="text-[10px] text-gray-400 mt-2 max-w-[110px] truncate">
                        {resource.supplier}
                      </p>
                    )}

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      )}

      {/* Request Resource Modal */}
      {showRequest && (
        <RequestResource
          projectId={projectId}
          onClose={() => setShowRequest(false)}
          onSuccess={() => {
            setShowRequest(false);
            fetchResources();
          }}
        />
      )}

    </div>
  );
};

export default Resources;