'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DiffView } from './DiffView';
import { useWeekStore } from '@/lib/store/useWeekStore';
import { ArrowRight } from 'lucide-react';

export function WeekEndModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const { tasks, completeWeek } = useWeekStore();

    // Safety check if methods exist (in case I forget to add completeWeek to store)
    const plannedTasks = tasks.filter(t => t.category === 'planned');
    const doneTasks = tasks.filter(t => t.category === 'done');

    const handleComplete = async () => {
        if (completeWeek) {
            await completeWeek();
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Weekly Reflection</DialogTitle>
                    <DialogDescription>
                        Review your week before locking in your progress and starting fresh.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <DiffView plannedTasks={plannedTasks} doneTasks={doneTasks} />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleComplete} className="gap-2">
                        Start Next Week
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
