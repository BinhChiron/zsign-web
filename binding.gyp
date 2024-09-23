{
  "targets": [
    {
      "target_name": "zsign",
      "sources": [ "src/zsign.cpp" ],
      "include_dirs": [
        "./node_modules/node-addon-api"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags_cc": [ "-fexceptions" ],
      "libraries": []
    }
  ]
}
