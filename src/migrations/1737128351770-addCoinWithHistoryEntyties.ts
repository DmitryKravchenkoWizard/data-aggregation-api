import {MigrationInterface, QueryRunner} from "typeorm";

export class addCoinWithHistoryEntyties1737128351770 implements MigrationInterface {
    name = 'addCoinWithHistoryEntyties1737128351770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chains" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coin_history_records" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "coinId" bigint, "marketCap" numeric(20,10), "fdv" numeric(20,10), "priceNative" numeric(30,15), "priceUsd" numeric(30,15), "buysTxnsM5" integer, "buysTxnsH1" integer, "buysTxnsH6" integer, "buysTxnsH24" integer, "sellsTxnsM5" integer, "sellsTxnsH1" integer, "sellsTxnsH6" integer, "sellsTxnsH24" integer, "volumeM5" numeric(20,10), "volumeH1" numeric(20,10), "volumeH6" numeric(20,10), "volumeH24" numeric(20,10), "priceChangeM5" numeric(5,2), "priceChangeH1" numeric(5,2), "priceChangeH6" numeric(5,2), "priceChangeH24" numeric(5,2), "liquidityUsd" numeric(20,10), "liquidityBase" numeric(30,15), "liquidityQuote" numeric(20,10), CONSTRAINT "PK_86e828fada08afa0c95b71ba1bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coins" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "chainId" bigint, "pairKey" character varying, "mintKey" character varying, "mintName" character varying NOT NULL, "mintSymbol" character varying, "quoteKey" character varying, "quoteSymbol" character varying, "quoteName" character varying NOT NULL, "detectedAt" TIMESTAMP, "marketMaker" character varying, CONSTRAINT "PK_af01e5dcef2c05e6385611205c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coins"`);
        await queryRunner.query(`DROP TABLE "coin_history_records"`);
        await queryRunner.query(`DROP TABLE "chains"`);
    }

}
