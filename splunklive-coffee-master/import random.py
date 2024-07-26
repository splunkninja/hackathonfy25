import random
import json
from datetime import datetime, timezone, timedelta

# Function to generate random telemetry data for a Nexus-like device
def generate_telemetry_data(device_id):
    num_interfaces = random.randint(1, 10)  # Random number of interfaces (1 to 10)
    interfaces = []

    for i in range(num_interfaces):
        interface_data = {
            "name": f"GigabitEthernet0/{i}",
            "input_packets": random.randint(0, 1000000),
            "output_packets": random.randint(0, 1000000),
            "input_errors": random.randint(0, 1000),
            "output_errors": random.randint(0, 1000)
        }
        interfaces.append(interface_data)

    telemetry_data = {
        "device_id": device_id,
        "timestamp": datetime.utcnow().replace(microsecond=0).isoformat() + 'Z',
        "cpu_usage": round(random.uniform(0, 100), 2),
        "memory_usage": round(random.uniform(0, 100), 2),
        "temperature": round(random.uniform(20, 85), 2),
        "uptime": random.randint(1000, 1000000),  # in seconds
        "interfaces": interfaces,
        "power_usage": round(random.uniform(10, 500), 2),
        "fan_speed": round(random.uniform(1000, 5000), 2),
        "packet_loss": round(random.uniform(0, 5), 2)
    }
    return telemetry_data

# Function to simulate and print telemetry data
def simulate_and_print_telemetry(num_devices, num_samples):
    for _ in range(num_samples):
        for device_id in range(1, num_devices + 1):
            data = generate_telemetry_data(f"nexus_device_{device_id}")
            print(json.dumps(data, indent=2))
            print("=" * 80)  # Optional separator for better readability

# Parameters
num_devices = 3  # Number of devices
num_samples = 5  # Number of samples per device

# Simulate and print telemetry data
simulate_and_print_telemetry(num_devices, num_samples)
