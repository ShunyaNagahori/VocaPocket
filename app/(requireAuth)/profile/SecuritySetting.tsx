"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { updatePassword } from './actions';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "現在のパスワードを入力してください"),
  newPassword: z.string().min(8, "パスワードは8文字以上である必要があります"),
  confirmPassword: z.string().min(1, "パスワードを再入力してください"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "新しいパスワードが一致しません",
  path: ["confirmPassword"],
});

const SecuritySetting = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      setLoading(true);

      await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });

      toast({
        title: "パスワード更新完了",
        description: "パスワードが更新されました",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "パスワードの更新に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="security">
      <Card className="border-t-4 border-t-secondary mb-6">
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
          <CardDescription>
            アカウントのパスワードを更新する
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>現在のパスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="border-secondary/20 focus:border-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>新しいパスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="border-secondary/20 focus:border-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>新しいパスワード（確認）</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="border-secondary/20 focus:border-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </Form>
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
  );
};

export default SecuritySetting;
