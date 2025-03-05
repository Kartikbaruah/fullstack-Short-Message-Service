import { useState, useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Camera, User, Mail } from "lucide-react"

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updatedProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)


  useEffect(() => {
    console.log("Current authUser:", authUser)
  }, [authUser])
  

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updatedProfile({ profilePic: base64Image })
    }
  }

  const formatMemberSince = () => {
    if (!authUser) return "Loading..."

    const dateField = authUser.createdAt || authUser.created_at || authUser.timestamp || authUser.joinedAt

    if (!dateField) {
      console.log("Date field not found in authUser:", Object.keys(authUser))
      return "Not available"
    }

    try {
      // Handle both string date formats and Date objects
      const date = new Date(dateField)
      if (isNaN(date.getTime())) {
        console.log("Invalid date format:", dateField)
        return "Invalid date"
      }

      // Format as YYYY-MM-DD
      return date.toISOString().split("T")[0]
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Date error"
    }
  }

  // If auth is still being checked or user is null, show loading
  if (!authUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Image Upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.jpg"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser.fullName || authUser.username || "Not available"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser.email || "Not available"}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{formatMemberSince()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

