'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Package,
  Plus,
  Loader2,
  MapPin,
  Wrench,
  X,
  Filter,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  condition: string;
  status: string;
  serialNumber: string | null;
  purchaseDate: string | null;
  notes: string | null;
  createdAt: string;
}

const conditionColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  EXCELLENT: 'success',
  GOOD: 'primary',
  FAIR: 'secondary',
  POOR: 'destructive',
  DAMAGED: 'destructive',
  REPLACED: 'default',
};

const assetTypes = ['', 'FURNITURE', 'ELECTRONICS', 'APPLIANCE', 'SPORTS_EQUIPMENT', 'VEHICLE', 'OTHER'];
const assetStatuses = ['', 'ACTIVE', 'IN_MAINTENANCE', 'RETIRED', 'LOST', 'DAMAGED'];
const conditions = ['', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED', 'REPLACED'];

export default function AdminAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'FURNITURE',
    location: '',
    condition: 'GOOD',
    serialNumber: '',
    purchaseDate: '',
    notes: '',
  });

  async function fetchAssets() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterType) params.set('type', filterType);
      if (filterStatus) params.set('status', filterStatus);
      if (filterCondition) params.set('condition', filterCondition);
      const res = await fetch(`/api/admin/assets?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setAssets(data);
    } catch {
      toast.error('Failed to load assets');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, [filterType, filterStatus, filterCondition]);

  async function createAsset(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) {
      toast.error('Name and location are required');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create');
      await res.json();
      toast.success('Asset created');
      setShowForm(false);
      setFormData({ name: '', type: 'FURNITURE', location: '', condition: 'GOOD', serialNumber: '', purchaseDate: '', notes: '' });
      fetchAssets();
    } catch {
      toast.error('Failed to create asset');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Asset Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track and manage hall assets and equipment
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </motion.div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Types</option>
              {assetTypes.filter(Boolean).map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Statuses</option>
              {assetStatuses.filter(Boolean).map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Conditions</option>
              {conditions.filter(Boolean).map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mb-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-knust-lust" />
                  New Asset
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={createAsset} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name *</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="h-11 w-full rounded-xl border bg-background px-4 text-sm">
                    {assetTypes.filter(Boolean).map((t) => (<option key={t} value={t}>{t}</option>))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Location *</label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Condition</label>
                  <select value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="h-11 w-full rounded-xl border bg-background px-4 text-sm">
                    {conditions.filter(Boolean).map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Serial Number</label>
                  <Input value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Purchase Date</label>
                  <Input type="date" value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Notes</label>
                  <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="min-h-[80px] w-full rounded-xl border bg-background px-4 py-3 text-sm" />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <Button type="submit" loading={submitting}>Create Asset</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
        </div>
      ) : assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-display text-lg font-semibold">No assets found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filterType || filterStatus || filterCondition ? 'Try adjusting your filters' : 'Add your first asset to get started'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant={conditionColors[asset.condition] || 'default'}>{asset.condition}</Badge>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.type}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {asset.location}
                      </span>
                      <Badge variant={asset.status === 'ACTIVE' ? 'success' : 'secondary'} size="sm">{asset.status}</Badge>
                    </div>
                  </div>
                  {asset.serialNumber && (
                    <p className="mt-2 text-xs text-muted-foreground">S/N: {asset.serialNumber}</p>
                  )}
                  {asset.notes && (
                    <p className="mt-1 text-sm text-muted-foreground">{asset.notes}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
