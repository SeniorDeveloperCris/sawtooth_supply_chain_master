/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

const express = require('express')
const db = require('./db')
const blockchain = require('./blockchain')
const protos = require('./blockchain/protos')
const api = require('./api')
const config = require('./system/config')

const PORT = config.PORT
const app = express()

Promise.all([
  db.connect(),
  protos.compile(),
  blockchain.connect()
])
  .then(() => {
    app.use('/', api)
    app.listen(PORT, () => {
      console.log(`Supply Chain Server listening on port ${PORT}`)
    })
  })
  .catch(err => console.error(err.message))
