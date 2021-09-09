import { registerClient, withReference } from './util'
import parse from 'csv-parse'
import { readFileSync } from 'fs'
import { zip } from './util'
import faker from 'faker'

const CSV_FILE = process.env.CSV_FILE as string

const run = async () => {
    parse(readFileSync(CSV_FILE).toString(), {
      comment: '#'
    }, (_, output: string[][]) => withReference(output.map(record => record.map(field => field.trim())), cleaned_output =>
      withReference<[string[], string[][]], any>([cleaned_output[0], cleaned_output.slice(1)], ([fieldNames, tableData]) =>
        withReference(tableData.map(record => Object.fromEntries(zip(fieldNames, record))), clients =>
          clients.forEach(async client => {
            const res = await registerClient(({ ...client, password: faker.internet.password(), portal: '1' }))
            console.log(client['email'], JSON.stringify(res === 'Success' ? res : res.error))
          })))))
}

run()