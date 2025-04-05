"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { User } from "@prisma/client";

const PreferencesSetting = ({ user }: { user: User }) => {
  const { toast } = useToast();

  return (
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
  );
};

export default PreferencesSetting;
