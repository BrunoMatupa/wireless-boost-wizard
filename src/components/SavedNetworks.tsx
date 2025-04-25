
import React from 'react';
import { Card } from '@/components/ui/card';
import { WifiHigh } from 'lucide-react';

interface SavedNetworksProps {
  networks: Array<{
    ssid: string;
    security: string;
  }>;
}

const SavedNetworks = ({ networks }: SavedNetworksProps) => {
  return (
    <Card className="p-6 bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Saved Networks</h2>
      {networks.length === 0 ? (
        <p className="text-gray-400">No saved networks yet</p>
      ) : (
        <div className="space-y-3">
          {networks.map((network) => (
            <div key={network.ssid} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700">
              <WifiHigh className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-medium">{network.ssid}</p>
                <p className="text-sm text-gray-400">{network.security}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SavedNetworks;
