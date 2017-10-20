<template>
  <div id="add-dataset">

    <md-whiteframe md-elevation="4">
      <md-toolbar class="md-transparent">
        <h2 class="md-title" style="flex: 1">Create New Dataset</h2>
      </md-toolbar>

      <hr/>
      <br>

      <div id="add-dataset-contents">
        <md-list>
          <md-subheader>Type of the dataset</md-subheader>

          <md-list-item>
            <md-radio v-model="datasetType" id="my-test4" name="my-test-group2" md-value="dicom" class="md-primary">DICOM file</md-radio>
          </md-list-item>
          <md-list-item>
            <md-radio v-model="datasetType" id="my-test5" name="my-test-group2" md-value="bigquery" class="md-primary">BigQuery</md-radio>
          </md-list-item>
          <md-list-item>
            <md-radio v-model="datasetType" id="my-test6" name="my-test-group2" md-value="video" class="md-primary" disabled>Video Link</md-radio>

            <md-divider v-if="datasetType"></md-divider>
          </md-list-item>

          <br>

          <template v-if="datasetType === 'dicom'">
            <md-subheader>DICOM file dataset</md-subheader>

            <div class="add-dataset-input-container">
              <md-input-container>
                <label>Please enter the new DICOM dataset name.</label>
                <md-input v-model="datasetName" placeholder="A new dataset name"></md-input>
              </md-input-container>
              <md-input-container style="margin-top: -20px">
                <label>Please add the DICOM zip file</label>
                <md-file v-model="dicomFile" accept=".zip"></md-file>
              </md-input-container>
            </div>
          </template>

          <template v-else-if="datasetType === 'bigquery'">
            <md-subheader>BigQuery dataset</md-subheader>

            <div class="add-dataset-input-container">
              <md-input-container>
                <label>Please enter the new BigQuery dataset name.</label>
                <md-input v-model="datasetName" placeholder="A new dataset name"></md-input>
              </md-input-container>
              <md-input-container style="margin-top: -20px">
                <label>Please enter the BigQuery table name.</label>
                <md-input v-model="bigqueryTableName" placeholder="A BigQuery table name" disabled></md-input>
              </md-input-container>
            </div>
          </template>

        </md-list>
      </div>

      <br>
    </md-whiteframe>

    <div style="float: right">
      <md-button class="md-raised" @click.native="cancelClicked">Cancel</md-button>
      <md-button class="md-raised md-primary" @click.native="createDataset">Create</md-button>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'AddDataset',
    data () {
      return {
        datasetType: null,
        datasetName: '',
        bigqueryTableName: '8seconds',
        dicomFile: null
      }
    },
    computed: mapState(['currentProjectId']),
    created () {
      const projectId = this.$route.params.projectId
      if (!this.currentProjectId) {
        this.$store.commit('SET_CURRENT_PROJECT_ID', projectId)
      }
    },
    watch: {
      datasetType () {
        console.log(this.datasetType)
      },
      dicomFile () {
        console.log(this.dicomFile)
      }
    },
    methods: {
      cancelClicked () {
        this.$router.push(`/project/${this.currentProjectId}/dataset/list`)
      },
      createDataset () {
        if (!this.currentProjectId) {
          alert('Internal Error !')
          this.$router.push(`/project/list`)
          return
        }
        if (!this.datasetName || this.datasetName.trim() === '') {
          alert('Please enter the dataset name.')
          return
        }
        var options = {
          projectId: this.currentProjectId,
          name: this.datasetName,
          desc: `This ${this.datasetType} dataset is made by whatsit-web`,
          type: this.datasetType
        }

        if (this.datasetType === 'bigquery') {
          options.data = []

          let dataString = '{' +
            '"dataset_name": "stylelens",' +
            '"table_name": "8seconds",' +
            '"service_account": {' +
            '"type": "service_account",' +
            '"project_id": "bluelens-11b9b",' +
            '"private_key_id": "d8117bd9e6b15f105a6d11d9ad4b03e2221c1a14",' +
            '"private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCaNrYxFuD0AZzt\\nGRbDCFHebIr7Pv4Gv3PRDox0+cWFZVCUMTCh/B4UV9VibYrzTdT8Wj9Dj00kR42w\\nh1z1ZE2dzgNygiKujawQOivowWmeY4EzM63XlcYiCnM7kERnyoY8WKSOXKiJeZKn\\nPBY6zvOSTbTglOZWBb5Szg2EkQmdLarceaYNCwPVmxBk5Eh7XPfXh0Cwz9XHO/tb\\nA4fQg4ttB69aGGIy/KVpsYSFVOpnlehzP7SCRjkESxi4S1cj88GW6ZFs5NwgMLrQ\\nV9hZNP6/btAGQzej7kLJFKByUw6VX4fcp9aOyI7AxNX3Gmb1BV3azoxuLBs60+4b\\n7m2ApGdZAgMBAAECgf8HiApgeSJy0tg/Uul78ZkOor4Zp4nJtWjpqsVIdNp1Irga\\nc3uEXdYBwnaxAENbf3sxz0O+Gx7NZvNZ3lG8HBMeH91mhakYxMviRnC4K9ZuHbwB\\npBEMrOT2Bsl8JtIKuAIKizvUIznwO11YWcI33tuej1dPBcBdw9bcCWsPYgtA0m1X\\nRzjlpik0dakk+MXiXCadBK48oTu1mJqnlNN20ZyRvikqUkSb7B22i5WyuGTtw1JV\\nk5el1eF8q6vhfVZfJOmrUAFTCjrVM25qw2LxPTIfUHbKGF7hMSnCW5Hd8fAiBnb2\\nOHQi5E8HhIW8lbU1xOfg8AuEk83RgkCi/72B40cCgYEAy2g4ibQP3hea8NQ8335w\\ngM9CVf4KvjE5jQVb9dHywqa/OUQjJfGAflL6tMM9cCKXw2WqZEalnlCpD9eIWB0f\\noXPQFv944IX+rZrzGrDEVfVNpUy51cSzs24aOl+ytRs07OQ3eqiAZ38eRNn1gRua\\nB2zRqStTl0ybxMb976gTUfcCgYEAwhZRCfGxLt6OtnlcChTk3nyQ2oW8tdlq75bt\\n9xJMTcA3csFZ9rPx8pvB4d6bVwW/iE2LtEsm77y9L/uz0GyUUD47XhiH+SDJM212\\nM9PEoM7sLt7DMDqrJbcrRPsl3RQrVOSkOKhQje0V/b1utFkA8oAB/vFtRAjiFQ0S\\ndwXTvS8CgYAunUzPqfc0833rkQf+Q/CuZFEUeeqmWYuR2NeRRzL2Dtal3gqcCHNk\\n/8k6ob+zsgnLmsHoxxPvaxbDbaZuYwY7rtnSW2utMKgDyw3JYRcth9Dqf+HaroBs\\nL2BNXl8LCBgh7c8VCgabMVOTfcu4ccXjy7lkpmw6sTDFcMEDKiZ7UwKBgC8wOdfP\\nGaMpnU0kSIpy9gpaAuX+ahlUmTlTWtwdaMvmlhSiifr/WS4BTKxb8SzBSwYaxIK7\\nWuYi32SRL/DW1WCFIO4JzNV3cTO9w2VqcX4fkTD8HDzXptDureiBn30W8EodpQfZ\\ndGxtXlFpA0d59E8BbHrNvCE0f7NakEi78/UlAoGAE5Carmi6Ay8ajajIm+wjPBlo\\nVxMtOwC1qXO88/0pgv1xtGLFSpfrQJBOg0CxkkkT0PYb0K2eVHMtDJa98wm6m2zD\\n4wYc/p7JGlIH6X+gEHrAOsPhfcZu5ymippwZ7MJzKZVg9NH6v4vOQUiBsDtALwxG\\newYinVWDysqPgguFyUs=\\n-----END PRIVATE KEY-----\\n",' +
            '"client_email": "bluelens-style@bluelens-11b9b.iam.gserviceaccount.com",' +
            '"client_id": "110705968444794053642",' +
            '"auth_uri": "https://accounts.google.com/o/oauth2/auth",' +
            '"token_uri": "https://accounts.google.com/o/oauth2/token",' +
            '"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",' +
            '"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bluelens-style%40bluelens-11b9b.iam.gserviceaccount.com"' +
            '}' +
            '}'
          options.data.push(JSON.parse(dataString))
        }
        this.requestAddDataset(options)
      },
      requestAddDataset: function (options) {
        // request API
        return this.$store.dispatch('addDataset', {
          options: options
        }).then(() => {
          console.log('done addDataset in AddDataset.vue')
          this.$router.replace({ path: `/project/${this.currentProjectId}/dataset/list` })
        })
      }
    }
  }
</script>

<style scoped>
  #add-dataset {
    margin: 0;
    position: absolute;
    width: 50vw;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .md-whiteframe {
    background-color: white;
  }

  #add-dataset-contents {
    width: 90%;
    left: 5%;
    position: relative;
  }

  .add-dataset-input-container {
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
