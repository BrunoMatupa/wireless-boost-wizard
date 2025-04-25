
import React, { useState, useEffect } from 'react';
import { WifiHigh, WifiLow, WifiZero, Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SavedNetworks from './SavedNetworks';
import NetworkDetails from './NetworkDetails';

interface WifiNetwork {
  ssid: string;
  signalStrength: number;
  security: string;
  channel: number;
  password?: string;
}

const WifiScanner = () => {
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [savedNetworks, setSavedNetworks] = useState<WifiNetwork[]>(() => {
    const saved = localStorage.getItem('savedNetworks');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork | null>(null);

  useEffect(() => {
    // Simulate scanning for networks
    const scanNetworks = () => {
      const mockNetworks: WifiNetwork[] = [
        { ssid: "Home_Network", signalStrength: 85, security: "WPA2", channel: 6 },
        { ssid: "Office_WiFi", signalStrength: 60, security: "WPA3", channel: 11 },
        { ssid: "Guest_Network", signalStrength: 45, security: "Open", channel: 1 },
        { ssid: "Neighbor_5G", signalStrength: 30, security: "WPA2", channel: 36 },
      ];
      setNetworks(mockNetworks);
    };

    scanNetworks();
    const interval = setInterval(scanNetworks, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSignalIcon = (strength: number) => {
    if (strength >= 70) return <WifiHigh className="h-6 w-6" />;
    if (strength >= 40) return <WifiLow className="h-6 w-6" />;
    return <WifiZero className="h-6 w-6" />;
  };

  const saveNetwork = (network: WifiNetwork) => {
    const updatedSavedNetworks = [...savedNetworks, network];
    setSavedNetworks(updatedSavedNetworks);
    localStorage.setItem('savedNetworks', JSON.stringify(updatedSavedNetworks));
  };

  const downloadApp = () => {
    alert("Desktop app download starting... (This is a demo - in a real app, this would trigger the actual download)");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">WiFi Boost Manager</h1>
          <Button onClick={downloadApp} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Desktop App
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Networks</h2>
            <div className="space-y-4">
              {networks.map((network) => (
                <Card key={network.ssid} className="p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedNetwork(network)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getSignalIcon(network.signalStrength)}
                      <div>
                        <h3 className="font-medium">{network.ssid}</h3>
                        <p className="text-sm text-gray-400">{network.security} - Ch {network.channel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={network.signalStrength} className="w-24" />
                      <Button size="sm" variant="ghost" onClick={(e) => {
                        e.stopPropagation();
                        saveNetwork(network);
                      }}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {selectedNetwork && (
              <NetworkDetails network={selectedNetwork} />
            )}
            <SavedNetworks networks={savedNetworks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WifiScanner;
