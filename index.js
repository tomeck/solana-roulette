const web3 = require("@solana/web3.js");
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
console.log(connection);

const userWallet=web3.Keypair.generate();
console.log(userWallet);

const userPublicKey = userWallet.publicKey;
const userSecretKey = userWallet.secretKey;

console.log("User Public key is", userPublicKey.toBase58())

// Request an airdrop of n Sols
async function doAirdrop(accountPubKey, numSols)  {

    console.log("Requesting Airdrop");

    const sig = await connection.requestAirdrop(
        accountPubKey,
        numSols * LAMPORTS_PER_SOL,
      );

    await connection.confirmTransaction(sig);
    console.log("Airdrop complete");

    let balance = await connection.getBalance(accountPubKey);
    console.log("New balance is", balance / LAMPORTS_PER_SOL)
}

async function main() {
    await doAirdrop(userPublicKey, 2);
}

main().then(
    () => process.exit(),
    err => {
      console.error(err);
      process.exit(-1);
    },
  );