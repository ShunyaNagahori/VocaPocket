"use client"

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { updateProfile } from './actions';
import { toast } from '@/hooks/use-toast';

const schema = z.object({
  name: z.string().min(1, "アカウント名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
});

const ProfileSetting = ({ user }: { user: User | null }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      await updateProfile(data);
      toast({
        title: "データ保存完了",
        description: "プロフィールが更新されました。",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "更新に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="profile">
      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>プロフィール情報</CardTitle>
          <CardDescription>
            アカウント情報を更新する
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-2 flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>アカウント名</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            {...field}
                            className="border-primary/20 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            {...field}
                            type="email"
                            className="border-primary/20 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                    <span>{user?.createdAt.toLocaleDateString()}</span>
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
                variant="gradient"
                className="md:w-auto"
                disabled={loading}
              >
                {loading ? "更新中..." : "変更を保存"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </TabsContent>
  )
}

export default ProfileSetting
