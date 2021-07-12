<template>
  <div>
      <b-container fluid="true">
          <b-row>
              <b-col/>
              <b-col>
                  <b-card
                     bg-variant="light"
                  >
                      <b-card-header
                      >
                          <div style="text-align: center"><b>{{ cardTitle }}</b></div>
                      </b-card-header>
                      <b-card-body>
                          <b-alert v-if="isErrorLabelNeeded" show variant="danger">{{ errorLabelText }}</b-alert>
                          <!--                          Username input filed below  -->
                          <b-form-group>
                              <b-form-input
                                  v-model="username"
                                  placeholder="Enter your ID"
                                  :state="loginNameState"
                                  trim
                              />
                              <b-form-invalid-feedback
                                  :state="loginNameState"
                                  style="text-align: end; margin-bottom: 0.5rem"
                              >
                                  Username should be between 3 and 20 characters
                              </b-form-invalid-feedback>
                          </b-form-group>

                          <!--                          Password input filed below-->
                          <b-form-group>
                              <b-form-input
                                  v-model="pw"
                                  placeholder="Enter your password"
                                  type="password"
                                  :state="loginPasswordState"
                              />
                              <b-form-invalid-feedback
                                  :state="loginPasswordState"
                                  style="text-align: end"
                              >
                                  Password should be between 6 and 10 characters
                              </b-form-invalid-feedback>
                          </b-form-group>

                          <!--                          Login button below-->
                              <b-button
                                  style="margin-top: 2rem"
                                  size="sm"
                                  variant="success"
                                  block
                                  :disabled="loginBtnDisabled"
                                  @click="loginOrSignup()"
                              >
                                  {{ cardTitle }}
                              </b-button>

                          <!--                          Signup button below-->
                          <b-row>
                              <b-col/>
                              <b-col>
                                  <p style="margin-top: 2rem; text-align: center">{{ signUpButtonHelper }}</p>
                                  <b-button
                                      size="sm"
                                      variant="secondary"
                                      block
                                      @click="changeMode"
                                  >
                                      {{ signUpButtonText }}
                                  </b-button>
                              </b-col>
                          </b-row>
                      </b-card-body>
                  </b-card>
              </b-col>
              <b-col/>
          </b-row>
      </b-container>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            mode: 'login',
            username: '',
            pw: '',
            userResponse: ''
        }
    },
    computed: {
        ...mapGetters('User', ['getError']),
        cardTitle() {
            return this.mode === 'login'? 'Log In' : 'Sign Up'
        },
        isErrorLabelNeeded() {
            return this.getError !== null
        },
        errorLabelText() {
            if (this.isErrorLabelNeeded) {
                return this.getError
            }
            return ''
        },
        loginNameState() {
            if (this.username) {
                return (this.username.length <= 20 && this.username.length >= 3)
            }
            return null
        },
        loginPasswordState() {
            if (this.pw) {
                return (this.pw.length <= 10 && this.pw.length >= 6)
            }
            return null
        },
        loginBtnDisabled() {
            return !(this.loginNameState && this.loginPasswordState);
        },
        signUpButtonText() {
            return this.mode === 'login'? 'Sign Up' : 'Log In'
        },
        signUpButtonHelper() {
            return this.mode === 'login'? 'No account yet?' : 'Log In with existing profile'
        }
    },
    methods: {
        ...mapActions('User', ['tryLogIn', 'createNewUser']),
        ...mapMutations('User', ['setError']),
        changeMode() {
            this.mode === 'login'? this.mode = 'signup' : this.mode = 'login'
            this.clearInputFields()
            this.setError(null)
        },
        clearInputFields() {
            this.username = ''
            this.pw = ''
        },
        loginOrSignup() {
            if (this.mode === 'login') {
                this.tryLogIn({
                    email: this.username,
                    password: this.pw
                })
            } else {
                this.createNewUser({
                    email: this.username,
                    password: this.pw,
                })
            }
            this.clearInputFields()
        }
    }
}
</script>
