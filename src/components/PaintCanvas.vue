<template>
  <div ref="container" class="container-fluid">
    <div class="button-bar">
      <a href="javascript:void(0)" @click="save" title="Save"><i class="fa fa-2x fa-save"></i></a>
      <a href="javascript:void(0)" @click="download" title="Download image"><i class="fa fa-2x fa-download"></i></a>
      <input type="file" id="upload" style="display: none;" @change="addFile" title="Upload image"><label for="upload"><i class="fa fa-2x fa-upload"></i></label>
      <i class="fa fa-2x fa-trash" @click="clear" title="Clear"></i>
      <i class="fa fa-2x fa-eraser" :class="[state === 'erasing' ? 'eraser-active' : '']" @click="toggleEraser" title="Erase"></i>
      <input type="color" v-model="color" title="Choose color">
      <input class="form-control" type="number" min="1" v-model="lineWidth" title="Choose linewidth">
    </div>
    <div v-if="showAlert" class="alert alert-success" role="alert">
      Image successfully saved to gallery!
    </div>
    <canvas ref="canvas" id="paint" v-on:mousedown="startDraw" v-on:mouseout="stopDraw" v-on:mouseup="stopDraw" v-on:mousemove="draw" v-on:touchstart="startTouch" v-on:touchend="stopDraw" v-on:touchmove="touch" v-on:touchcancel="stopDraw">
    </canvas>
  </div>
</template>

<script>
  /* eslint-disable max-len */

  import axios from 'axios';
  import Position from './../classes/Position';
  import Utils from './../classes/Utils';
  import store from './../classes/Store';

  export default {
    name: 'PaintCanvas',
    data() {
      return {
        drawState: false,
        prevPosition: new Position(),
        curPosition: new Position(),
        color: 'black',
        lineWidth: 2,
        state: 'drawing',
        shared: store.state,
        showAlert: false,
      };
    },
    methods: {
      resize() {
        const dataUrl = this.$refs.canvas.toDataURL();
        this.$refs.canvas.width = this.$refs.container.offsetWidth;
        this.$refs.canvas.height = this.$refs.container.offsetHeight;
        this.loadImage(dataUrl);
      },
      loadImage(image = 'https://dl.dropboxusercontent.com/s/65pw702ltkue5ep/darth-vader.jpg') {
        this.clear();
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.crossOrigin = 'Anonymous';

        imageObj.onload = () => {
          context.drawImage(imageObj, (canvas.width / 2) - (imageObj.width / 2), (canvas.height / 2) - (imageObj.height / 2));
        };
        imageObj.src = image;
      },
      startTouch(event) {
        const touch = event.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        this.$refs.canvas.dispatchEvent(mouseEvent);
      },
      touch(event) {
        const touch = event.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        this.$refs.canvas.dispatchEvent(mouseEvent);
      },
      startDraw(event) {
        const canvas = this.$refs.canvas;

        this.drawState = true;
        const offset = Utils.cumulativeOffset(canvas);
        this.currPosition = new Position(event.clientX - offset.left, event.clientY - offset.top);
      },
      stopDraw() {
        this.drawState = false;
      },
      draw(event) {
        const canvas = this.$refs.canvas;
        if (this.drawState) {
          this.prevPosition = this.currPosition;

          const offset = Utils.cumulativeOffset(canvas);
          this.currPosition = new Position(event.clientX - offset.left, event.clientY - offset.top);

          if (this.state === 'drawing') {
            this.drawPath(this.prevPosition, this.currPosition);
          } else if (this.state === 'erasing') {
            this.erasePath(this.prevPosition, this.currPosition);
          }
        }
      },
      drawPath(startPosition, endPosition) {
        const context = this.$refs.canvas.getContext('2d');
        context.beginPath();
        context.moveTo(startPosition.x, startPosition.y);
        context.lineTo(endPosition.x, endPosition.y);
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.stroke();
        context.closePath();
      },
      erasePath(startPosition, endPosition) {
        const context = this.$refs.canvas.getContext('2d');
        context.beginPath();
        context.moveTo(startPosition.x, startPosition.y);
        context.lineTo(endPosition.x, endPosition.y);
        context.strokeStyle = 'white';
        context.lineWidth = this.lineWidth;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.stroke();
        context.closePath();
      },
      toggleEraser() {
        if (this.state === 'erasing') {
          this.state = 'drawing';
        } else {
          this.state = 'erasing';
        }
      },
      download(event) {
        const element = event.currentTarget;

        element.href = this.$refs.canvas.toDataURL();
        element.download = 'painter.png';
      },
      save(event) {
        const form = new FormData();
        const dataUrl = this.$refs.canvas.toDataURL();
        form.append('imageData', dataUrl);

        axios.post(`${this.shared.baseUrl}/image`, form)
          .then((response) => {
            // eslint-disable-next-line
            console.log('image saved');
            this.showAlert = true;

            setTimeout(() => { this.showAlert = false; }, 2000);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      },
      addFile(event) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          this.loadImage(reader.result);
        });

        const file = event.currentTarget.files[0];

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      clear() {
        const canvas = this.$refs.canvas;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      },
    },
    mounted() {
      this.resize();
      window.addEventListener('resize', this.resize, false);
      this.loadImage();
      document.body.addEventListener('touchstart', (e) => {
        if (e.target == this.$refs.canvas) {
          e.preventDefault();
        }
      }, { passive: false });
      document.body.addEventListener('touchend', (e) => {
        if (e.target == this.$refs.canvas) {
          e.preventDefault();
        }
      }, { passive: false });
      document.body.addEventListener('touchmove', (e) => {
        if (e.target == this.$refs.canvas) {
          e.preventDefault();
        }
      }, { passive: false });
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  canvas {
    position: absolute;
    left: 0;
  }

  .container-fluid {
    padding: 0;
    height: 100%;
    position: relative;

    .button-bar {
      text-align: left;
      padding: 10px 20px;
      z-index: 20;
      position: absolute;

      i {
        margin-right: 16px;
        vertical-align: middle;
        cursor: pointer;
        padding: 4px;
        color: darkslategrey;
        border: 2px solid white;
      }

      input {
        display: inline-block;
        margin-right: 20px;
        color: darkslategrey;
      }

      input[type=number] {
        width: 80px;
      }
    }

    .alert {
      position: relative;
      top: 100px;
    }
  }

  .eraser-active {
    border: 2px solid black !important;
    border-radius: 6px;
  }

  a {
    display: inline-block;
  }
</style>
