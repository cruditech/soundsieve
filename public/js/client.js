import {
    Uppy,
    Dashboard,
    ImageEditor,
    RemoteSources,
    Transloadit,
  } from 'https://releases.transloadit.com/uppy/v3.18.0/uppy.min.mjs'
function setupUpload() {
  const signature = document.getElementById('transloadit-signature').innerText;
  console.log('signature', signature);
  const uppy = new Uppy()
    .use(Transloadit, {
      waitForEncoding: true,
      alwaysRunAssembly: true,
      assemblyOptions: {
        params: {
          template_id: '660b248600d947bc85f2d608249cbc3c',
          // To avoid tampering, use Signature Authentication:
          // https://transloadit.com/docs/topics/signature-authentication/
          auth: {
            key: signature,
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
  uppy.on('complete', (result) => {
    const uploadedFiles = result.successfulUploads.map(file => {
        return {
        id: file.id,
        name: file.name,
        url: file.uploadURL
        }
    })

    console.log(uploadedFiles)
  })
}
setupUpload();