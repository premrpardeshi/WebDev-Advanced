import { RedisClientType, createClient } from "redis";

export class PubSubManager {
  private subscriptions: Map<string, string[]>;
  private redisClient: RedisClientType;
  private static instance: PubSubManager;

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance() {
    if (PubSubManager.instance) {
      return PubSubManager.instance;
    }
    PubSubManager.instance = new PubSubManager();
    return PubSubManager.instance;
  }

  public userSubscribe(userId: string, stock: string) {
    if (!PubSubManager.getInstance().subscriptions.get(stock))
      PubSubManager.getInstance().subscriptions.set(stock, []);
    else PubSubManager.getInstance().subscriptions.get(stock)?.push(userId);

    this.redisClient.subscribe(stock, (message) => {
      if (PubSubManager.getInstance().subscriptions.get(stock)?.length === 1) {
        this.redisClient.subscribe(stock, (message) => {
          this.handleMessage(stock, message);
        });
      }
      console.log(`Subscribed to Redis channel: ${stock}`);
    });
  }

  public userUnSubscribe(userId: string, stock: string) {
    this.subscriptions.set(
      stock,
      this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || []
    );

    if (this.subscriptions.get(stock)?.length === 0) {
      this.redisClient.unsubscribe(stock);
      console.log(`UnSubscribed to Redis channel: ${stock}`);
    }
  }

  private handleMessage(stock: string, message: string) {
    console.log(`Message received on channel ${stock}: ${message}`);
    PubSubManager.getInstance()
      .subscriptions.get(stock)
      ?.forEach((sub) => {
        console.log(`Sending message to user: ${sub}`);
      });
  }

  public async disconnect() {
    await this.redisClient.quit();
  }
}
