
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NetworkDetailsProps {
  network: {
    ssid: string;
    signalStrength: number;
    security: string;
    channel: number;
  };
}

const NetworkDetails = ({ network }: NetworkDetailsProps) => {
  return (
    <Card className="p-6 bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Network Details</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-400">Network Name</p>
          <p className="font-medium">{network.ssid}</p>
        </div>
        <div>
          <p className="text-gray-400">Signal Strength</p>
          <div className="flex items-center gap-2">
            <Progress value={network.signalStrength} className="w-full" />
            <span>{network.signalStrength}%</span>
          </div>
        </div>
        <div>
          <p className="text-gray-400">Security Type</p>
          <p className="font-medium">{network.security}</p>
        </div>
        <div>
          <p className="text-gray-400">Channel</p>
          <p className="font-medium">{network.channel}</p>
        </div>
      </div>
    </Card>
  );
};

export default NetworkDetails;
