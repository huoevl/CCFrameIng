1. shader源码解读：builtin-unlit.effect
    ``` yaml
    # 以无光照着色器 builtin-unlit.effect 为例，其中包含了专门用于渲染不透明物体的渲染技术 opaque 和专门用于渲染透明物体的渲染技术 transparent
    # 一个渲染对象只能选择使用 opaque 或者 transparent

    # CCEffect 的核心内容是渲染技术（technique），
    # 一个 CCEffect 中支持定义多个渲染技术，但在实际渲染过程中，只有其中一个会被采用。
    # 每个渲染技术（technique）都包含了名称（name）和渲染过程（pass），
    # 名称用于标记渲染技术的用途，渲染过程则定义一个了完整的渲染流程所需要的全部信息
    # 一个渲染过程必须包含一个顶点着色器（Vertex Shader）和一个片元着色器（Fragment Shader）
    # 顶点/片元着色器需要指定使用的 Shader（CCProgram）和入口函数

    # 语法规则：注意：冒号后的空格不可省略
    CCEffect %{
      techniques:
      - name: opaque 
        passes: # 渲染过程
        # 着色器格式为 片段名: 入口函数名
        - vert: unlit-vs:vert # 顶点着色器，选择一个 CCProgram 声明的顶点着色器 ‘unlit-vs’，入口函数是 vert
          frag: unlit-fs:frag # 片元着色器，同上
          properties: &props
            mainTexture:    { value: grey }
            tilingOffset:   { value: [1, 1, 0, 0] }
            mainColor:      { value: [1, 1, 1, 1], linear: true, editor: { type: color } }
            colorScale:     { value: [1, 1, 1], target: colorScaleAndCutoff.xyz }
            alphaThreshold: { value: 0.5, target: colorScaleAndCutoff.w, editor: { parent: USE_ALPHA_TEST } }
            color:          { target: mainColor, linear: true, editor: { visible: false } } # backward compability
          migrations: &migs
            properties:
              mainColor:    { formerlySerializedAs: color }
      - name: transparent
        passes:
        - vert: unlit-vs:vert
          frag: unlit-fs:frag
          depthStencilState: &d1
            depthTest: true
            depthWrite: false
          blendState: #关掉深度写入，开启透明混合
            targets:
            - blend: true
              blendSrc: src_alpha
              blendDst: one_minus_src_alpha
              blendDstAlpha: one_minus_src_alpha
          properties: *props
          migrations: *migs
      - name: add
        passes:
        - vert: unlit-vs:vert
          frag: unlit-fs:frag
          rasterizerState: &r1 { cullMode: none }
          depthStencilState: *d1
          blendState:
            targets:
            - blend: true
              blendSrc: src_alpha
              blendDst: one
              blendSrcAlpha: src_alpha
              blendDstAlpha: one
          properties: *props
          migrations: *migs
      - name: alpha-blend
        passes:
        - vert: unlit-vs:vert
          frag: unlit-fs:frag
          rasterizerState: *r1
          depthStencilState: *d1
          blendState:
            targets:
            - blend: true
              blendSrc: src_alpha
              blendDst: one_minus_src_alpha
              blendSrcAlpha: src_alpha
              blendDstAlpha: one_minus_src_alpha
          properties: *props
          migrations: *migs
    }%
    ```
    ``` glsl
    // 在 Cocos Effect 中由 CCProgram 包裹的部分是由 GLSL 语法 声明的 Shader 片段

    CCProgram unlit-vs %{
      precision highp float;
      #include <input>
      #include <cc-global>
      #include <decode-base>
      #include <cc-local-batch>
      #include <input>
      #include <cc-fog-vs>

      #if USE_VERTEX_COLOR
        in lowp vec4 a_color;
        out lowp vec4 v_color;
      #endif

      #if USE_TEXTURE
        out vec2 v_uv;
        uniform TexCoords {
          vec4 tilingOffset;
        };
      #endif

      vec4 vert () {
        vec4 position;
        CCVertInput(position);

        mat4 matWorld;
        CCGetWorldMatrix(matWorld);

        #if USE_TEXTURE
          v_uv = a_texCoord * tilingOffset.xy + tilingOffset.zw;
          #if SAMPLE_FROM_RT
            CC_HANDLE_RT_SAMPLE_FLIP(v_uv);
          #endif
        #endif

        #if USE_VERTEX_COLOR
          v_color = a_color;
        #endif

        CC_TRANSFER_FOG(matWorld * position);
        return cc_matProj * (cc_matView * matWorld) * position;
      }
    }%

    CCProgram unlit-fs %{
      precision highp float;
      #include <output-standard>
      #include <cc-fog-fs>

      #if USE_ALPHA_TEST
        #pragma define-meta ALPHA_TEST_CHANNEL options([a, r, g, b])
      #endif

      #if USE_TEXTURE
        in vec2 v_uv;
        uniform sampler2D mainTexture;
      #endif

      uniform Constant {
        vec4 mainColor;
        vec4 colorScaleAndCutoff;
      };

      #if USE_VERTEX_COLOR
        in lowp vec4 v_color;
      #endif

      vec4 frag () {
        vec4 o = mainColor;
        o.rgb *= colorScaleAndCutoff.xyz;

        #if USE_VERTEX_COLOR
          o.rgb *= SRGBToLinear(v_color.rgb);//use linear
          o.a *= v_color.a;
        #endif

        #if USE_TEXTURE
          vec4 texColor = texture(mainTexture, v_uv);
          texColor.rgb = SRGBToLinear(texColor.rgb);
          o *= texColor;
        #endif

        #if USE_ALPHA_TEST
          if (o.ALPHA_TEST_CHANNEL < colorScaleAndCutoff.w) discard;
        #endif

        CC_APPLY_FOG(o);
        return CCFragOutput(o);
      }
    }%
    ```