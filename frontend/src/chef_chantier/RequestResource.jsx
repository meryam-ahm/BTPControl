import React, { useState } from 'react';
import { X, Package, Truck, Search, Check, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const units = [
  { value: 'unit', label: 'Unit', group: 'Common' },
  { value: 'piece', label: 'Piece', group: 'Common' },
  { value: 'kg', label: 'kg', group: 'Common' },
  { value: 'm2', label: 'm²', group: 'Common' },
  { value: 'm3', label: 'm³', group: 'Common' },
  { value: 'm', label: 'Meter', group: 'Common' },
  { value: 'tonne', label: 'Tonne', group: 'Materials' },
  { value: 'litre', label: 'Litre', group: 'Materials' },
  { value: 'bag', label: 'Bag', group: 'Materials' },
  { value: 'box', label: 'Box', group: 'Materials' },
  { value: 'pallet', label: 'Pallet', group: 'Materials' },
  { value: 'roll', label: 'Roll', group: 'Materials' },
  { value: 'sheet', label: 'Sheet', group: 'Materials' },
  { value: 'bar', label: 'Bar', group: 'Construction' },
  { value: 'bundle', label: 'Bundle', group: 'Construction' },
  { value: 'load', label: 'Load', group: 'Construction' },
  { value: 'mm', label: 'Millimeter', group: 'Construction' },
  { value: 'hour', label: 'Hour', group: 'Equipment & Time' },
  { value: 'day', label: 'Day', group: 'Equipment & Time' }
];

const RequestResource = ({ onClose, onSuccess }) => {
  const { currentProject } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    type: 'material',
    quantity: '',
    unit: 'unit',
    status: 'available',
    supplier: ''
  });

  const [loading, setLoading] = useState(false);
  const [showUnits, setShowUnits] = useState(false);
  const [unitSearch, setUnitSearch] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedUnit = units.find((u) => u.value === formData.unit);

  const filteredUnits = units.filter((unit) =>
    unit.label.toLowerCase().includes(unitSearch.toLowerCase())
  );

  const groupedUnits = filteredUnits.reduce((groups, unit) => {
    if (!groups[unit.group]) {
      groups[unit.group] = [];
    }
    groups[unit.group].push(unit);
    return groups;
  }, {});

  const selectUnit = (unit) => {
    setFormData({
      ...formData,
      unit: unit.value
    });
    setShowUnits(false);
    setUnitSearch('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.quantity) return;

    try {
      setLoading(true);

      await axios.post(
        `http://127.0.0.1:8000/api/projects/${currentProject}/createResource`,
        {
          name: formData.name,
          type: formData.type,
          quantity: Number(formData.quantity),
          unit: formData.unit,
          status: formData.status,
          supplier: formData.supplier || null
        }
      );

      if (onSuccess) onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add Resource</h2>
              <p className="text-xs text-gray-400">Add a resource to this project</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Resource Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Cement, Excavator, Hammer..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="material">Material</option>
                <option value="equipment">Equipment</option>
                <option value="tool">Tool</option>
                <option value="vehicle">Vehicle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                min="0"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 50"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Unit
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUnits(!showUnits)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white flex items-center justify-between hover:border-blue-400 focus:outline-none focus:border-blue-500 transition"
              >
                <span className="text-gray-700">
                  {selectedUnit?.label}
                </span>

                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition ${
                    showUnits ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showUnits && (
                <div className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-2 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                      <input
                        type="text"
                        value={unitSearch}
                        onChange={(e) => setUnitSearch(e.target.value)}
                        placeholder="Search units..."
                        autoFocus
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto p-2">
                    {Object.keys(groupedUnits).length === 0 ? (
                      <div className="py-6 text-center text-sm text-gray-400">
                        No unit found
                      </div>
                    ) : (
                      Object.entries(groupedUnits).map(([group, groupUnits]) => (
                        <div key={group} className="mb-3 last:mb-0">
                          <p className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                            {group}
                          </p>

                          <div className="grid grid-cols-2 gap-1">
                            {groupUnits.map((unit) => (
                              <button
                                key={unit.value}
                                type="button"
                                onClick={() => selectUnit(unit)}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition ${
                                  formData.unit === unit.value
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <span>{unit.label}</span>

                                {formData.unit === unit.value && (
                                  <Check className="w-4 h-4 text-blue-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="damaged">Damaged</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Supplier
            </label>

            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="e.g. Atlas Construction"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#1A73E8] text-white text-sm font-bold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestResource;