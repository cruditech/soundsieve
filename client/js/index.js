import { animate } from "motion"
import Uppy from '@uppy/core';  
import {
  Uppy,
  Dashboard,
  ImageEditor,
  RemoteSources,
  Transloadit,
} from 'https://releases.transloadit.com/uppy/v3.18.0/uppy.min.mjs'
$(function() {
    $('#browse').click(function() {
        $.get('/uploadkey', function(res) {
            $('#result').text(res);
        });
    });
});
const uppy = new Uppy()
  .use(Transloadit, {
    waitForEncoding: true,
    alwaysRunAssembly: true,
    assemblyOptions: {
      params: {
        // To avoid tampering, use Signature Authentication:
        // https://transloadit.com/docs/topics/signature-authentication/
        auth: {
          key: 'YOUR_TRANSLOADIT_KEY',
        },
        // It's often better store encoding instructions in your account
        // and use a `template_id` instead of adding these steps inline
        steps: {
          thumb: {
            use: ':original',
            robot: '/image/resize',
            width: 75,
            height: 75,
            resize_strategy: 'fit',
          },
        },
      },
    },
  })
  .use(Dashboard, { trigger: '#browse' })
  .use(ImageEditor, { target: Dashboard })
  .use(RemoteSources, {
    companionUrl: 'https://api2.transloadit.com/companion',
  })
  .on('complete', ({ transloadit }) => {
    // Due to `waitForEncoding:true` this is fired after encoding is done.
    // Alternatively, set `waitForEncoding` to `false` and provide a `notify_url`
    console.log(transloadit) // Array of Assembly Statuses
    transloadit.forEach((assembly) => {
      console.log(assembly.results) // Array of all encoding results
    })
  })
  .on('error', (error) => {
    console.error(error)
  })