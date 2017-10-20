import WhatsIt from 'whatsit-sdk-js'
import GitHub from 'github-api'
import jsonp from 'jsonp'

import {clearToken} from '../util/auth'

export function fetchProfile (token, provider) {
  if (provider === 'github') {
    return new Promise((resolve, reject) => {
      var github = new GitHub({token: token})
      github.getUser().getProfile().then(profile => {
        console.log(profile.data)
        const data = profile.data
        const resProfile = {
          login: data.login,
          avatarUrl: data.avatar_url,
          email: data.email,
          oauthProvider: provider
        }
        resolve(resProfile)
      }).catch(err => {
        clearToken()
        console.error(err)
        reject(err)
      })
    })
  } else if (provider === 'google') {
    return new Promise((resolve, reject) => {
      jsonp(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, null,
        (_, response) => {
          if (response) {
            console.log('google Login')
            console.log(response)
            let name = 'User'
            if (response.email) {
              name = response.email.split('@')[0]
            }
            const resProfile = {
              login: name,
              avatarUrl: response.picture,
              email: response.email,
              oauthProvider: provider
            }
            resolve(resProfile)
          } else {
            clearToken()
          }
        })
    })
  }
}

export function updateUserProfile (profile) {
  return new Promise((resolve, reject) => {
    let whatsit = new WhatsIt({})
    let data = {
      login: profile.login,
      avatarUrl: profile.avatarUrl,
      email: profile.email,
      oauthProvider: profile.oauthProvider
    }
    whatsit.getUser().updateProfile(data).then(res => {
      console.log(res)
      if (res != null) {
        resolve(res.data)
      }
    }).catch(err => {
      clearToken()
      console.error(err)
      reject(err)
    })
  })
}

// /projects  GET
export function getProjects (userId) {
  return new Promise((resolve, reject) => {
    var whatsit = new WhatsIt({})
    var data = {
      userId: userId
    }
    whatsit.getProject().getProjectsByUser(data).then(res => {
      console.log(res.data)
      resolve(res.data.data.projects)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

// /projects POST
export function addProject (project) {
  return new Promise((resolve, reject) => {
    var whatsit = new WhatsIt({})
    whatsit.getProject().addProject(project).then(res => {
      console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

// /datasets  GET
export function getDatasets (projectId) {
  return new Promise((resolve, reject) => {
    var whatsit = new WhatsIt({})
    var queryParam = {
      projectId: projectId
    }
    console.log(queryParam)
    whatsit.getDataset().getDatasetByProjectId(queryParam).then(res => {
      console.log(res.data)
      resolve(res.data.data.Datasets)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

// /datasets POST
export function addDataset (dataset) {
  return new Promise((resolve, reject) => {
    var whatsit = new WhatsIt({})
    whatsit.getDataset().addDataset(dataset).then(res => {
      if (res != null) {
        console.log(res.data)
        resolve(res.data)
      }
    }).catch(err => {
      console.error(err)
      reject(err)
    })
  })
}
