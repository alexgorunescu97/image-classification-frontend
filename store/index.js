import Vuex from 'vuex';

const store = () => {
    return new Vuex.Store({
        state: () => ({
              registerFields: [
                {type: "text", name: 'First Name', value: '', id: 1},
                {type: "text", name: 'Last Name', value: '', id: 2},
                {type: "email", name: 'Email', value: '', id: 3},
                {type: "text", name: 'Username', value: '', id: 4},
                {type: "password", name: 'Password', value: '', id: 5}
              ],
              newRegisterFields: [
                {type: "text", name: 'First Name', value: '', id: 1},
                {type: "text", name: 'Last Name', value: '', id: 2},
                {type: "email", name: 'Email', value: '', id: 3},
                {type: "text", name: 'User', value: '', id: 4}
              ],
              error: '',
              urlImageFields: [
                  {value: ""}
                ],
              loginFields: [
                {type: "email", name: 'Username', value: '', id: 1},
                {type: "password", name: 'Password', value: '', id: 2}
              ],
              passwordFields: [
                  {type: "password", name: "Enter your current password", value: '', id: 1},
                  {type: "password", name: "Enter your new password", value: '', id: 2},
                  {type: "password", name: "Confirm yout new password", value: '', id: 3}                
              ],
              forgotPassFields: [
                {type: "password", name: "Enter your new password", value: '', id: 1},
                {type: "password", name: "Confirm your new password", value: '', id: 2},             
              ],
              emailFields: [
                {type: "email", name: "Enter your email", value: '', id: 1}
              ],
              radio: {
                name: 'Profession', value: ''
              },
              classPred: ''
        }),
        mutations: {
            changeRegisterField(state, {value, index}) {
                state.registerFields[index].value = value;
            },
            
            changeNewRegisterField(state, {value, index}) {
                state.newRegisterFields[index].value = value;
            },

            changeLoginField(state, {value, index}) {
                state.loginFields[index].value = value;
            },

            changePasswordField(state, {value, index}) {
                state.passwordFields[index].value = value;
            },
            
            changeRadio(state, val) {
                state.radio.value = val;
            },

            changeUrlImageField(state, {value, index}) {
                state.urlImageFields[index].value = value;
            },

            changeEmailField(state, {value, index}) {
                state.emailFields[index].value = value;
            },

            changeForgotPassField(state, {value, index}) {
                state.forgotPassFields[index].value = value;
            },

            resetForgotPassState(state) {
                state.forgotPassFields = state.forgotPassFields.map(elem => {
                    elem.value = '';
                    return elem;
                });                
            },

            resetEmailState(state) {
                state.emailFields = state.emailFields.map(elem => {
                    elem.value = '';
                    return elem;
                });
            },

            resetRegisterState(state) {
                state.registerFields = state.registerFields.map(elem => {
                    elem.value = '';
                    return elem;
                });
                state.radio.value='';

            },

            resetLoginState(state) {
                state.loginFields = state.loginFields.map(elem => {
                    elem.value = '';
                    return elem;
                });
            },

            resetUrlImageState(state) {
                state.urlImageFields[0].value = ''
            },

            resetNewRegisterState(state) {
                state.newRegisterFields = state.newRegisterFields.map(elem => {
                    const field = elem.name.toLowerCase().split(' ').join('_');
                    elem.value = this.$auth.user[field];
                    return elem;
                });
            },

            resetPasswordState(state) {
                state.passwordFields = state.passwordFields.map(elem => {
                    elem.value = '';
                    return elem;
                });
            },

            changeError(state, error) {
                state.error = error;
            },

            setClass(state, classPred) {
                state.classPred = classPred;
            },

            resetClass(state) {
                state.classPred = '';
            }

        },

        actions: {
            async delete( {commit}) {
                try {
                    await this.$axios.delete(`accounts/users/${this.$auth.user.id}/`)
                    this.$auth.strategy.token.reset()
                    this.$auth.$state.user = false;
                    this.$auth.$state.loggedIn = false;
                } catch(e) {
                    commit('changeError', 'User could not be deleted')
                }
            },
            async changePass( { state, commit }) {
                const pass = state.passwordFields[1].value;
                const confPass = state.passwordFields[2].value;
                if (pass === confPass) {
                    try {
                        await this.$axios.patch(`accounts/users/${this.$auth.user.id}/`, {
                            old_pass: state.passwordFields[0].value, 
                            password: state.passwordFields[1].value
                        })
                        this.$auth.strategy.token.reset()
                        this.$auth.$state.user = false;
                        this.$auth.$state.loggedIn = false;
                    } catch(e) {
                        commit('changeError', 'Wrong password')
                    }
                } else {
                    commit('changeError', "Passwords don't match")
                }

            },

            async updateUser( { state, commit }) {
                const updateUser = {
                    first_name: state.newRegisterFields[0].value,
                    last_name: state.newRegisterFields[1].value,
                    email: state.newRegisterFields[2].value,
                    user: state.newRegisterFields[3].value
                }
                try {
                    await this.$axios.patch(`accounts/users/${this.$auth.user.id}/`, updateUser)
                    this.$auth.setUser({
                        ...updateUser,
                        profession: this.$auth.user.profession,
                        entries: this.$auth.user.entries,
                        id: this.$auth.user.id
                    })
                    commit('resetNewRegisterState')
                } catch(e) {
                    commit('changeError', 'Something went wrong')
                }
            },

            async predictImg({state, commit}) {
                const url = {
                    imageUrl: state.urlImageFields[0].value
                }
                try {
                    const res = await this.$axios.post('predict/', url);
                    let classPredField = res.data.split(',')[1];
                    let classProbField = res.data.split(',')[2]
                    let probability = classProbField.slice(0, classProbField.length-1);
                    if (parseFloat(probability) > 0.5) {
                        commit('setClass', classPredField.slice(2, classPredField.length - 1));
                    } else {
                        commit('setClass', 'Not sure');
                    }
                } catch(e) {
                    commit('changeError', 'Something went wrong');
                }



            },

            async predictUploadImage({commit}, {file}) {
                const fd = new FormData();
                fd.append('image', file);
                try {
                    const res = await this.$axios.post('predict/', fd);
                    let classPredField = res.data.split(',')[1];
                    let classProbField = res.data.split(',')[2]
                    let probability = classProbField.slice(0, classProbField.length-1);
                    if (parseFloat(probability) > 0.5) {
                        commit('setClass', classPredField.slice(2, classPredField.length - 1));
                    } else {
                        commit('setClass', 'Not sure');
                    }
                } catch(e) {
                    commit('changeError', 'Something went wrong')
                }


            },

            async sendResetEmail({state}) {
                const email = {
                    email: state.emailFields[0].value
                }
                try {
                    await this.$axios.post('users/reset_password/', email);
                } catch(e) {
                    console.log(e);
                }
            },

            async forgotPass({state, commit}, {token, uid}) {
                const newPass = {
                    uid: uid,
                    token: token,
                    new_password: state.forgotPassFields[0].value,
                    re_new_password: state.forgotPassFields[1].value
                }
    
                if (newPass['new_password'] === newPass['re_new_password']) {
                    try {
                        await this.$axios.post('users/reset_password_confirm/', newPass);
                    } catch(e) {
                        commit('changeError', e)
                    }
                } else {
                    commit('changeError', "Passwords don't match")
                }
            }
        },

    })
}


/*
export const state = () => ({
    fields: [
        {type: "text", name: 'First Name', value: '', id: 1},
        {type: "text", name: 'Last Name', value: '', id: 2},
        {type: "email", name: 'Email', value: '', id: 3}
      ],
      radio: {
        name: 'Profession', value: ''
      }   
});

export const mutations = {

    changeFirstName(state, val) {
        state.fields[0].value = val;
    },

    changeLastName(state, val) {
        state.fields[1].value = val;
    },

    changeEmail(state, val) {
        state.fields[2].value = val;
    },
    
    changeRadio(state, val) {
        state.radio.value = val;
    }    
}
*/

export default store;