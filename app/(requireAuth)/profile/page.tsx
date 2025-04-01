"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, BookOpen, LogOut, Shield, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "プロフィールを更新しました",
        description: "変更が保存されました",
      });
      setLoading(false);

      // Reset password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }, 1000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileData.currentPassword || !profileData.newPassword || !profileData.confirmPassword) {
      toast({
        title: "エラー",
        description: "すべてのパスワードフィールドを入力してください",
        variant: "destructive",
      });
      return;
    }

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "エラー",
        description: "新しいパスワードが一致しません",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "パスワードを更新しました",
        description: "パスワードが正常に変更されました",
      });
      setLoading(false);

      // Reset password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }, 1000);
  };

  return (
    <div className="p-4 sm:py-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">アカウント設定</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-muted/50 w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <User className="h-4 w-4 mr-2" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Shield className="h-4 w-4 mr-2" />
              セキュリティ
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Settings className="h-4 w-4 mr-2" />
              設定
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle>プロフィール情報</CardTitle>
                <CardDescription>
                  アカウント情報を更新する
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="name">氏名</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>学習統計</Label>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-primary/10 rounded-md">
                          <p className="text-2xl font-bold text-primary">42</p>
                          <p className="text-sm text-muted-foreground">総ボキャブラリー数</p>
                        </div>
                        <div className="text-center p-3 bg-secondary/10 rounded-md">
                          <p className="text-2xl font-bold text-secondary">28</p>
                          <p className="text-sm text-muted-foreground">復習済み</p>
                        </div>
                        <div className="text-center p-3 bg-accent/10 rounded-md">
                          <p className="text-2xl font-bold text-accent">14</p>
                          <p className="text-sm text-muted-foreground">未復習</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-md">
                          <p className="text-2xl font-bold">67%</p>
                          <p className="text-sm text-muted-foreground">習熟度</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>アカウント情報</Label>
                    <div className="bg-muted/30 p-4 rounded-md space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">アカウント作成日</span>
                        <span>2025年1月15日</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">最終ログイン</span>
                        <span>2025年4月10日</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">プラン</span>
                        <span className="font-medium text-primary">無料</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    disabled={loading}
                  >
                    {loading ? "更新中..." : "変更を保存"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-t-4 border-t-secondary mb-6">
              <CardHeader>
                <CardTitle>パスワード変更</CardTitle>
                <CardDescription>
                  アカウントのパスワードを更新する
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">現在のパスワード</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleChange}
                      className="border-secondary/20 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">新しいパスワード</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={handleChange}
                      className="border-secondary/20 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={handleChange}
                      className="border-secondary/20 focus:border-secondary"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90"
                    disabled={loading}
                  >
                    {loading ? "更新中..." : "パスワードを変更"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card className="border-t-4 border-t-destructive">
              <CardHeader>
                <CardTitle>アカウント削除</CardTitle>
                <CardDescription>
                  アカウントとすべてのデータを完全に削除します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  アカウントを削除すると、すべてのボキャブラリーデータ、学習履歴、および個人情報が完全に削除されます。この操作は元に戻せません。
                </p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast({
                      title: "警告",
                      description: "この機能は現在利用できません",
                      variant: "destructive",
                    });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  アカウントを削除
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle>アプリケーション設定</CardTitle>
                <CardDescription>
                  アプリの動作と表示方法をカスタマイズする
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">通知設定</h3>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">メール通知</Label>
                      <p className="text-sm text-muted-foreground">
                        学習リマインダーとヒントをメールで受け取る
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-summary">週間サマリー</Label>
                      <p className="text-sm text-muted-foreground">
                        週ごとの学習進捗レポートを受け取る
                      </p>
                    </div>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">学習設定</h3>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-review">自動復習リマインダー</Label>
                      <p className="text-sm text-muted-foreground">
                      ボキャブラリーの復習が必要な時に通知する
                      </p>
                    </div>
                    <Switch id="auto-review" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-examples">例文を常に表示</Label>
                      <p className="text-sm text-muted-foreground">
                        リストで例文を表示する
                      </p>
                    </div>
                    <Switch id="show-examples" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">プライバシー設定</h3>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">使用データ収集</Label>
                      <p className="text-sm text-muted-foreground">
                        アプリ改善のための匿名データ収集を許可する
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
                  onClick={() => {
                    toast({
                      title: "設定を保存しました",
                      description: "アプリケーション設定が更新されました",
                    });
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  設定を保存
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
