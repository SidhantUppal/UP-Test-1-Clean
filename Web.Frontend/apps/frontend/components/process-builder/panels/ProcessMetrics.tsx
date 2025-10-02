import React from 'react';
import { MockMetrics } from '../types/process.types';

interface ProcessMetricsProps {
  metrics: MockMetrics;
}

export default function ProcessMetrics({ metrics }: ProcessMetricsProps) {
  return (
    <div className="card bg-base-200 p-4">
      <h3 className="text-xl font-bold mb-4">Process Metrics</h3>

      <div className="space-y-3">
        <div className="stat bg-base-100 rounded-lg p-3">
          <div className="stat-title text-xs">Total Processes</div>
          <div className="stat-value text-2xl">{metrics.processCount}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg p-3">
          <div className="stat-title text-xs">Avg Completion Time</div>
          <div className="stat-value text-xl">{metrics.avgCompletionTime}</div>
        </div>

        <div className="stat bg-base-100 rounded-lg p-3">
          <div className="stat-title text-xs">Success Rate</div>
          <div className="stat-value text-xl text-success">{metrics.successRate}%</div>
        </div>

        <div className="divider my-2"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs">
            <div className="text-base-content/60">Active Nodes</div>
            <div className="font-semibold">{metrics.activeNodes}</div>
          </div>
          <div className="text-xs">
            <div className="text-base-content/60">Connections</div>
            <div className="font-semibold">{metrics.connections}</div>
          </div>
        </div>
      </div>
    </div>
  );
}