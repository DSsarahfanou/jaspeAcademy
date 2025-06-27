<?php

namespace Database\Seeders;

use App\Models\Formation;
use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $formations = Formation::all();
        $modules = [
            'CCNA Certification Training' => [
                'Introduction to Networking',
                'IP Addressing and Subnetting',
                'Routing Protocols',
                'Switching Fundamentals',
            ],
            '5G Network Fundamentals' => [
                '5G Architecture',
                'Radio Access Technologies',
                'Network Slicing',
                '5G Security',
            ],
            'Network Security Essentials' => [
                'Threat Identification',
                'Firewall Configuration',
                'VPN Setup',
                'Intrusion Detection Systems',
            ],
            'Fiber Optic Communications' => [
                'Fiber Optic Basics',
                'Cabling and Connectors',
                'Signal Transmission',
                'Troubleshooting',
            ],
            'Wireless Networking' => [
                'Wi-Fi Standards',
                'Wireless Security',
                'Access Point Configuration',
                'Troubleshooting Wireless Networks',
            ],
        ];

        foreach ($formations as $formation) {
            foreach ($modules[$formation->name] as $moduleTitle) {
                Module::create([
                    'formation_id' => $formation->id,
                    'title' => $moduleTitle,
                    'description' => "Module covering {$moduleTitle} for {$formation->name}.",
                ]);
            }
        }
    }
}