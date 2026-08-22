import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Globe, VenusAndMars, Pencil } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";
import userService from "@/services/userService";

function getUserFromResponse(response) {
  if (!response) return null;

  return response.user || response.data || response;
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await userService.getCurrentUser();

        if (isMounted) {
          setUser(getUserFromResponse(response));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load your profile.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <Loading message="Loading your profile..." size="lg" />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="py-10 text-center">
            <User className="mx-auto mb-4 size-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">
              Profile information unavailable
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't find your profile information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName =
    user.name ||
    user.username ||
    user.fullName ||
    "User";

  const avatar =
    user.avatar ||
    user.profileImage ||
    user.image ||
    user.photo;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View your Parkit account information.
            </p>
          </div>

          <Link
            to="/settings"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <Pencil className="size-4" />
            Edit Profile
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Profile summary */}
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">

              <div className="mb-4 flex size-28 items-center justify-center overflow-hidden rounded-full bg-slate-200 ring-4 ring-slate-100 dark:bg-slate-800 dark:ring-slate-900">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${displayName}'s profile`}
                    className="size-full object-cover"
                  />
                ) : (
                  <User className="size-12 text-slate-500" />
                )}
              </div>

              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {displayName}
              </h2>

              {user.email && (
                <p className="mt-1 break-all text-sm text-muted-foreground">
                  {user.email}
                </p>
              )}

              {user.id && (
                <p className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  User ID: {user.id}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Account information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>

              <CardDescription>
                Your account and contact information.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2">

                <ProfileField
                  icon={User}
                  label="Name"
                  value={user.name || user.username}
                />

                <ProfileField
                  icon={Mail}
                  label="Email"
                  value={user.email}
                />

                <ProfileField
                  icon={Phone}
                  label="Phone"
                  value={user.phone}
                />

                <ProfileField
                  icon={MapPin}
                  label="Address"
                  value={user.address}
                />

                <ProfileField
                  icon={Globe}
                  label="Country"
                  value={user.country}
                />

                <ProfileField
                  icon={VenusAndMars}
                  label="Gender"
                  value={user.gender}
                />

                <ProfileField
                  icon={MapPin}
                  label="Zipcode"
                  value={user.zipcode || user.zipCode}
                />

              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  );
}

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">

        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Icon className="size-4 text-slate-600 dark:text-slate-300" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-medium text-slate-900 dark:text-white">
            {value || "Not provided"}
          </p>
        </div>

      </div>
    </div>
  );
}