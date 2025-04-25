import React, { useState, useEffect } from 'react';
import { WifiHigh, WifiLow, WifiZero, Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SavedNetworks from './SavedNetworks';
import NetworkDetails from './NetworkDetails';
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();

  useEffect(() => {
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
    toast({
      title: "Download Instructions",
      description: "To run this app on your device:\n1. Fork this project to your GitHub\n2. Git pull the project\n3. Run 'npm install'\n4. Run 'npx cap add ios' and/or 'npx cap add android'\n5. Run 'npm run build'\n6. Run 'npx cap sync'\n7. Run 'npx cap open ios' or 'npx cap open android'",
      duration: 10000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">WiFi Boost Manager</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button onClick={downloadApp} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download App
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Download Instructions</SheetTitle>
                <SheetDescription>
                  <div className="space-y-4 mt-4">
                    <p>Follow these steps to run the app on your device:</p>
                    <ol className="list-decimal pl-4 space-y-2">
                      <li>Export this project to your GitHub repository</li>
                      <li>Git pull the project to your local machine</li>
                      <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code></li>
                      <li>Add platforms:
                        <br />
                        - iOS: <code className="bg-gray-100 px-2 py-1 rounded">npx cap add ios</code>
                        <br />
                        - Android: <code className="bg-gray-100 px-2 py-1 rounded">npx cap add android</code>
                      </li>
                      <li>Build the project: <code className="bg-gray-100 px-2 py-1 rounded">npm run build</code></li>
                      <li>Sync with Capacitor: <code className="bg-gray-100 px-2 py-1 rounded">npx cap sync</code></li>
                      <li>Open in IDE:
                        <br />
                        - iOS: <code className="bg-gray-100 px-2 py-1 rounded">npx cap open ios</code>
                        <br />
                        - Android: <code className="bg-gray-100 px-2 py-1 rounded">npx cap open android</code>
                      </li>
                    </ol>
                    <p className="text-sm text-gray-500 mt-4">
                      Note: For iOS development, you need a Mac with Xcode installed. For Android, you need Android Studio.
                    </p>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
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
