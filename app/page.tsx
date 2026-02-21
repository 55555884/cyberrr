const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    try {
      // signIn ではなく walletAuth を使用します
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: crypto.randomUUID(), // セキュリティ用のランダムな文字
        requestId: "0",
        statement: "CYBERRRへのログインを承認してください。",
        expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24時間有効
      });

      if (finalPayload.status === "success") {
        console.log("ログイン成功！ アドレス:", finalPayload.address);
        // ここに成功後の処理（画面遷移など）を書きます
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };