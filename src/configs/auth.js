module.exports= {
   // token config
   jwt: {
      // for secret phrase, no https://www.md5hashgenerator.com/ geramos um md5 hash para colocar em nosso arquivo .env (que está na raíz de nosso app), não deixando disponível para todos, para que não tenha perigos na aplicação e um suposto forjamento de token, por isso utilizamos o arquivo .env para dados sensíveis. Para pegar uma variável de .env, usamos o "process.env.". Se por ventura não encontrar o nosso hash, ele buscará o default mesmo.
      secret:  process.env.AUTH_SECRET || "default",
      // expires in 1 day
      expiresIn: "1d"
   }
}