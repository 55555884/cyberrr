const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    try {
      // 廃止された signIn の代わりに walletAuth を使用します
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: crypto.randomUUID(),
        requestId: "0",
        statement: "CYBERRRへのログインを承認してください。",
        expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24時間有効
      });

      if (finalPayload.status === "success") {
        console.log("ログイン成功:", finalPayload.address);
        // 成功時の処理をここに書く
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };