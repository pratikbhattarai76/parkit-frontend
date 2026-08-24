/**
 * Mock data fallback for Admin Panel when API endpoints are unreachable or in development.
 */

export const mockAdminStats = {
  usersCount: 120,
  listingsCount: 85,
  reservationsCount: 64,
  activeBookings: 18,
  totalRevenue: "$4,250",
  systemStatus: "Healthy"
};

export const mockAdminUsers = [
  {
    id: "usr_101",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    createdAt: "2026-01-15",
    status: "Active"
  },
  {
    id: "usr_102",
    name: "Ram Sharma",
    email: "ram.sharma@example.com",
    role: "Host",
    createdAt: "2026-02-01",
    status: "Active"
  },
  {
    id: "usr_103",
    name: "Sita Sitaula",
    email: "sita.sitaula@example.com",
    role: "User",
    createdAt: "2026-02-10",
    status: "Pending"
  },
  {
    id: "usr_104",
    name: "Hari Prasad",
    email: "hari.prasad@example.com",
    role: "Host",
    createdAt: "2026-03-05",
    status: "Active"
  },
  {
    id: "usr_105",
    name: "Gita Nepal",
    email: "gita.nepal@example.com",
    role: "User",
    createdAt: "2026-03-12",
    status: "Suspended"
  }
];

export const mockAdminListings = [
  {
    id: "lst_201",
    title: "Downtown Secure Garage Spot",
    location: "Kathmandu Central",
    owner: "Ram Sharma",
    pricePerHour: "$5.00",
    status: "Available",
    createdAt: "2026-02-02"
  },
  {
    id: "lst_202",
    title: "Covered Parking near City Center",
    location: "Lalitpur Pulchowk",
    owner: "Hari Prasad",
    pricePerHour: "$3.50",
    status: "Occupied",
    createdAt: "2026-03-06"
  },
  {
    id: "lst_203",
    title: "Private Driveway Spot",
    location: "Bhaktapur Durbar Square",
    owner: "Ram Sharma",
    pricePerHour: "$4.00",
    status: "Available",
    createdAt: "2026-03-15"
  },
  {
    id: "lst_204",
    title: "Underground Commercial Complex Parking",
    location: "Thamel Mall",
    owner: "Hari Prasad",
    pricePerHour: "$6.00",
    status: "Maintenance",
    createdAt: "2026-04-01"
  }
];
