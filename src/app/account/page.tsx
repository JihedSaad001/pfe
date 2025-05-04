"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileForm from "../../components/ProfileForm"
import ReservationHistory from "../../components/ReservationHistory"
import UpcomingReservations from "../../components/UpcomingReservations"

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Upcoming Reservations</TabsTrigger>
          <TabsTrigger value="history">Reservation History</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <UpcomingReservations />
        </TabsContent>

        <TabsContent value="history">
          <ReservationHistory />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
