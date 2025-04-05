import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield } from "lucide-react";
import ProfileSetting from './ProfileSetting';
import SecuritySetting from './SecuritySetting';
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const { user } = await getSession();
  const profileData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <div className="p-4 sm:py-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">アカウント設定</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-muted/50 w-full grid grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <User className="h-4 w-4 mr-2" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Shield className="h-4 w-4 mr-2" />
              セキュリティ
            </TabsTrigger>
          </TabsList>

          <ProfileSetting user={profileData} />
          <SecuritySetting />
        </Tabs>
      </div>
    </div>
  );
}
