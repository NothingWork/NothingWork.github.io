
var ROOT_PATH = 'https://echarts.apache.org/examples';

/******旋转的地球*** */
var mycharts_rotate = echarts.init(document.getElementById('rotateworld'));

var optionrotate;

optionrotate = {
  backgroundColor: '#000',
  globe: {
    baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
    heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
    displacementScale: 0.04,
    shading: 'realistic',
    environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
    realisticMaterial: {
      roughness: 0.9
    },
    postEffect: {
      enable: true
    },
    light: {
      main: {
        intensity: 5,
        shadow: true
      },
      // ambientCubemap: {
      //   texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
      //   diffuseIntensity: 0.2
      // }
    }
  }
};

mycharts_rotate.setOption(optionrotate);
window.addEventListener('resize', mycharts_rotate.resize);