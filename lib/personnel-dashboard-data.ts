import { getPersonnelAccountsByRole } from "@/lib/personnel-accounts";
import type { PersonnelAccount } from "@/lib/db/schema";

export type DashboardStats = {
  todayAppointments: number;
  opdPatients: number;
  ipdPatients: number;
  emergencyCases: number;
  todayRevenue: number;
};

export type DashboardSummary = {
  newPatients: number;
  discharged: number;
  labTests: number;
  radiology: number;
  procedures: number;
};

export type DashboardBedOccupancy = {
  totalBeds: number;
  occupied: number;
  available: number;
  cleaning: number;
};

export type PersonnelDashboardData = {
  stats: DashboardStats;
  summary: DashboardSummary;
  bedOccupancy: DashboardBedOccupancy;
  doctors: PersonnelAccount[];
};

export async function getPersonnelDashboardData(): Promise<PersonnelDashboardData> {
  const doctors = await getPersonnelAccountsByRole("doctor");

  return {
    stats: {
      todayAppointments: 0,
      opdPatients: 0,
      ipdPatients: 0,
      emergencyCases: 0,
      todayRevenue: 0,
    },
    summary: {
      newPatients: 0,
      discharged: 0,
      labTests: 0,
      radiology: 0,
      procedures: 0,
    },
    bedOccupancy: {
      totalBeds: 0,
      occupied: 0,
      available: 0,
      cleaning: 0,
    },
    doctors,
  };
}
