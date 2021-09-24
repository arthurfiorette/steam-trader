import fs from 'fs/promises';
import { join } from 'path';
import { AccountOptions } from '../accounts/options';
import { logger } from '../logger';

const configPath = join(__dirname, '../../config/');
const accountsPath = join(configPath, 'accounts.json');

export async function readAccounts(): Promise<AccountOptions[]> {
  await createAccountFileIfNeeded();
  return fs
    .readFile(accountsPath, { encoding: 'utf8' })
    .then(JSON.parse)
    .then(checkAccountOptions)
    .then((accounts) => {
      logger.info(`Read ${accounts.length} accounts from config/accounts.json`);
      return accounts;
    });
}

export async function writeAccounts(accounts: AccountOptions[]) {
  await createAccountFileIfNeeded();
  return fs
    .writeFile(accountsPath, JSON.stringify(accounts, null, 2))
    .then(() => logger.info(`Write ${accounts.length} accounts to config/accounts.json`));
}

async function checkAccountOptions(options: AccountOptions[]) {
  if (!Array.isArray(options)) {
    await handleInvalidAccountFile();
  }
  return options;
}

async function handleInvalidAccountFile() {
  const newName = `accounts-invalid-${new Date().getTime()}.json`;
  logger.error(
    `Invalid accounts.json, Renaming it to ${newName} and creating a new empty one...`
  );
  await fs.rename(accountsPath, join(configPath, newName));
  await createAccountFileIfNeeded();
}

async function createAccountFileIfNeeded() {
  fs.mkdir(configPath).catch(() => {});
  return fs
    .stat(accountsPath)
    .catch(() =>
      fs
        .writeFile(accountsPath, '[]')
        .catch((err) =>
          logger.error(
            `Occurred an error while creating the config/accounts.json: ${err}`
          )
        )
    );
}
