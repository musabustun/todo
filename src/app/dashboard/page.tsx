import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    return (
        <div className="grid h-full gap-6 md:grid-cols-3">
            {/* Column 1: What I Planned (Past) */}
            <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">What I Planned</h2>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">0</span>
                </div>

                <div className="flex-1 space-y-3">
                    {/* Empty State / Tasks will go here */}
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-sm text-gray-400">No plans from last week found.</p>
                    </div>
                </div>
            </div>

            {/* Column 2: What I Did (Present) */}
            <div className="flex flex-col rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50 ring-1 ring-primary/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">What I Did</h2>
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">0</span>
                </div>

                <div className="flex-1 space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:border-primary hover:text-primary transition-colors">
                        <Plus className="h-4 w-4" />
                        Add completed task
                    </button>
                </div>
            </div>

            {/* Column 3: What I Will Do (Future) */}
            <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">What I Will Do</h2>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">0</span>
                </div>

                <div className="flex-1 space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:border-primary hover:text-primary transition-colors">
                        <Plus className="h-4 w-4" />
                        Add future task
                    </button>
                </div>
            </div>
        </div>
    );
}
