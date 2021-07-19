<template>
    <div>
        <h1>Image Classifier</h1>
        <div id="url-image-container">
            <div id="url-container">
                <input-label
                    id="input-label-url"
                    :name="'url'"
                    :type="'text'"
                    :index="0"
                    :task="'urlImage'"
                    :placeholder="'Enter url or select a file'"
                    :label="false"
                    @input.native="reset"
                />
                <button id="btn1" @click="onSubmit">{{fileSelected ? 'Upload' : 'Submit url'}}</button>
                <label for="file-upload" class="custom-file-upload">
                    Select File
                </label>
                <input accept="image/*" id="file-upload" type="file" @input="onFileSelect"/>

                <p id='file-name' v-if="fileSelected">{{file.name}}</p>

            </div>

            <div id="error" v-if="getError">
                <p>{{getError}}</p>
            </div>
            <div v-else-if="showImg && !getError" :class="[predicted ? 'green-border' : 'red-border']" id="img-container">
                <p v-if="getClass.length > 0 && getClass !== 'Not sure'">
                    {{`${['a','e','i','o','u'].indexOf(getClass[0].toLowerCase()) === -1 ? 'A': 'An'} ${getClass.split('_').join(' ')} was detected`}}
                </p>

                <p v-else-if="getClass.length > 0 && getClass === 'Not sure'">
                    Not sure
                </p>

                <p v-else>Loading...</p>
                <img-comp :src="getSrc"/>
            </div>
        </div>
    </div>
</template>
<script>
import ImgComp from '../../components/img-comp.vue';
import infoUser from '../../components/info-user.vue';
import InputLabel from '../../components/input-label.vue';
import Submit from '../../components/submit.vue';
export default {
    data() {
        return {
            entries: this.$auth.user.entries,
            showImg: false,
            fileSelected: false,
            fileUrl: '',
            file: ''
        }
    },
    computed: {
        getSrc() {
            if (!this.fileSelected) {
                return this.$store.state.urlImageFields[0].value;
            } else {
                return this.fileUrl;
            }
        },
        getClass() {
            return this.$store.state.classPred;
        },
        predicted() {
            if (this.getClass && this.getClass !== 'Not sure') {
                return true;
            } else {
                return false;
            }
        },
        getError() {
            return this.$store.state.error;
        }
    },
    components: {infoUser, InputLabel, Submit, ImgComp},
    methods: {
        async onSubmit() {
            this.showImg = true;
            if (!this.fileSelected) {
                await this.$store.dispatch('predictImg');
            } else {
                await this.$store.dispatch('predictUploadImage', {file: this.file})
            }
        },

        reset() {
            this.showImg = false;
            this.fileSelected = false;
            this.file = '';
            this.fileUrl = ''
            this.$store.commit('resetClass');
            this.$store.commit('changeError', '')
        },

        onFileSelect(event) {
            this.reset();
            this.$store.commit('resetUrlImageState')
            this.fileSelected = true;
            this.fileUrl = URL.createObjectURL(event.target.files[0]);
            this.file = event.target.files[0];
        }
    },
    destroyed() {
        this.$store.commit('changeError', '')
        this.$store.commit('resetUrlImageState');
    }
}
</script>


<style scoped>

  html, body {
    overflow: visible;
  }

    button {
        font-size: 3vw;
        padding: 2%;
        border-radius: 2%;
        margin: 0 2%;
        cursor: pointer;
    }

    h1 {
        font-size: 4vw;
        font-weight: bold;
        font-family: monospace;
        color: rgb(14, 50, 117);
        text-align: center;
    }

    #url-container {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }

    #input-label-url {
        align-self: flex-end;
        width: 60%;
        text-align: center;
    }

    button {
        font-size: 2vw;
        margin-top: 4%;
        cursor: pointer;
        color: white;
        border-style: none;
        padding: 1%;
        border-radius: 5%;
    }

    #btn1 {
        background-color: rgb(15, 190, 15);
        margin-right: 2.5%;
    }

    #img-container {
        text-align: center;
        width: 50%;
        height: 50%;
        margin: 2% auto 0 auto;
    }

    .red-border {
        border: 5px solid red;
    }

    .green-border {
        border: 5px solid green;
    }

    #img-container p {
        font-size: 2vw;
        font-weight: bold;
        font-family: monospace;
        color: rgb(14, 50, 117);
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        border-style: none;
        margin-top: 4%;
        border-radius: 5%;
        color: white;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
        font-size: 2vw;
        background-color: rgb(158, 43, 23);
        display: flex;
        align-items: center;  
    }

    #file-name {
        color: white;
        margin: 0 0 0 2%;
        align-self: flex-end;
        font-size: 2vw;
        height: 100%;
    }

    #error {
        color: red;
        font-size: 1.5vw;
        font-weight: bold;
        text-align: center;
    }

</style>