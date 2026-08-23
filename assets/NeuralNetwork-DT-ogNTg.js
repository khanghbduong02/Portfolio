import{r as y,j as l,P as a}from"./index-Cb3oEdVN.js";import{I as Fe,F as le,a as Q,b as I,W as He,B as ne,S as ve,V as U,c as Ge,U as ue,d as fe,e as be,M as Ne,f as F,g as We,h as Ve,L as ke,u as ge,C,_ as de,i as Ye,P as $e,j as P,T as Xe,k as Je,D as Ke}from"./Preload-BoR99lnv.js";import{v as we,O as Ze,H as Qe}from"./OrbitControls-DcDbk_KT.js";const Se=we>=125?"uv1":"uv2",pe=new ne,W=new U;class se extends Fe{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new le(e,3)),this.setAttribute("uv",new le(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Q(t,6,1);return this.setAttribute("instanceStart",new I(n,3,0)),this.setAttribute("instanceEnd",new I(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const s=new Q(n,t*2,1);return this.setAttribute("instanceColorStart",new I(s,t,0)),this.setAttribute("instanceColorEnd",new I(s,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new He(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ne);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),pe.setFromBufferAttribute(t),this.boundingBox.union(pe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ve),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,f=e.count;r<f;r++)W.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(W)),W.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(W));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class _e extends se{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let s=0;s<t;s+=3)n[2*s]=e[s],n[2*s+1]=e[s+1],n[2*s+2]=e[s+2],n[2*s+3]=e[s+3],n[2*s+4]=e[s+4],n[2*s+5]=e[s+5];return super.setPositions(n),this}setColors(e,t=3){const n=e.length-t,s=new Float32Array(2*n);if(t===3)for(let r=0;r<n;r+=t)s[2*r]=e[r],s[2*r+1]=e[r+1],s[2*r+2]=e[r+2],s[2*r+3]=e[r+3],s[2*r+4]=e[r+4],s[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)s[2*r]=e[r],s[2*r+1]=e[r+1],s[2*r+2]=e[r+2],s[2*r+3]=e[r+3],s[2*r+4]=e[r+4],s[2*r+5]=e[r+5],s[2*r+6]=e[r+6],s[2*r+7]=e[r+7];return super.setColors(s,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class re extends Ge{constructor(e){super({type:"LineMaterial",uniforms:ue.clone(ue.merge([fe.common,fe.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new be(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${we>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const $=new F,me=new U,he=new U,E=new F,R=new F,L=new F,X=new U,J=new Ve,j=new ke,ye=new U,V=new ne,k=new ve,A=new F;let T,D;function xe(o,e,t){return A.set(0,0,-e,1).applyMatrix4(o.projectionMatrix),A.multiplyScalar(1/A.w),A.x=D/t.width,A.y=D/t.height,A.applyMatrix4(o.projectionMatrixInverse),A.multiplyScalar(1/A.w),Math.abs(Math.max(A.x,A.y))}function et(o,e){const t=o.matrixWorld,n=o.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,f=Math.min(n.instanceCount,s.count);for(let u=0,d=f;u<d;u++){j.start.fromBufferAttribute(s,u),j.end.fromBufferAttribute(r,u),j.applyMatrix4(t);const x=new U,v=new U;T.distanceSqToSegment(j.start,j.end,v,x),v.distanceTo(x)<D*.5&&e.push({point:v,pointOnLine:x,distance:T.origin.distanceTo(v),object:o,face:null,faceIndex:u,uv:null,[Se]:null})}}function tt(o,e,t){const n=e.projectionMatrix,r=o.material.resolution,f=o.matrixWorld,u=o.geometry,d=u.attributes.instanceStart,x=u.attributes.instanceEnd,v=Math.min(u.instanceCount,d.count),m=-e.near;T.at(1,L),L.w=1,L.applyMatrix4(e.matrixWorldInverse),L.applyMatrix4(n),L.multiplyScalar(1/L.w),L.x*=r.x/2,L.y*=r.y/2,L.z=0,X.copy(L),J.multiplyMatrices(e.matrixWorldInverse,f);for(let i=0,p=v;i<p;i++){if(E.fromBufferAttribute(d,i),R.fromBufferAttribute(x,i),E.w=1,R.w=1,E.applyMatrix4(J),R.applyMatrix4(J),E.z>m&&R.z>m)continue;if(E.z>m){const g=E.z-R.z,b=(E.z-m)/g;E.lerp(R,b)}else if(R.z>m){const g=R.z-E.z,b=(R.z-m)/g;R.lerp(E,b)}E.applyMatrix4(n),R.applyMatrix4(n),E.multiplyScalar(1/E.w),R.multiplyScalar(1/R.w),E.x*=r.x/2,E.y*=r.y/2,R.x*=r.x/2,R.y*=r.y/2,j.start.copy(E),j.start.z=0,j.end.copy(R),j.end.z=0;const w=j.closestPointToPointParameter(X,!0);j.at(w,ye);const h=We.lerp(E.z,R.z,w),S=h>=-1&&h<=1,_=X.distanceTo(ye)<D*.5;if(S&&_){j.start.fromBufferAttribute(d,i),j.end.fromBufferAttribute(x,i),j.start.applyMatrix4(f),j.end.applyMatrix4(f);const g=new U,b=new U;T.distanceSqToSegment(j.start,j.end,b,g),t.push({point:b,pointOnLine:g,distance:T.origin.distanceTo(b),object:o,face:null,faceIndex:i,uv:null,[Se]:null})}}}class Ee extends Ne{constructor(e=new se,t=new re({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let f=0,u=0,d=t.count;f<d;f++,u+=2)me.fromBufferAttribute(t,f),he.fromBufferAttribute(n,f),s[u]=u===0?0:s[u-1],s[u+1]=s[u]+me.distanceTo(he);const r=new Q(s,2,1);return e.setAttribute("instanceDistanceStart",new I(r,1,0)),e.setAttribute("instanceDistanceEnd",new I(r,1,1)),this}raycast(e,t){const n=this.material.worldUnits,s=e.camera;s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;T=e.ray;const f=this.matrixWorld,u=this.geometry,d=this.material;D=d.linewidth+r,u.boundingSphere===null&&u.computeBoundingSphere(),k.copy(u.boundingSphere).applyMatrix4(f);let x;if(n)x=D*.5;else{const m=Math.max(s.near,k.distanceToPoint(T.origin));x=xe(s,m,d.resolution)}if(k.radius+=x,T.intersectsSphere(k)===!1)return;u.boundingBox===null&&u.computeBoundingBox(),V.copy(u.boundingBox).applyMatrix4(f);let v;if(n)v=D*.5;else{const m=Math.max(s.near,V.distanceToPoint(T.origin));v=xe(s,m,d.resolution)}V.expandByScalar(v),T.intersectsBox(V)!==!1&&(n?et(this,t):tt(this,s,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport($),this.material.uniforms.resolution.value.set($.z,$.w))}}class nt extends Ee{constructor(e=new _e,t=new re({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const st=y.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:s,lineWidth:r,segments:f,dashed:u,...d},x){var v,m;const i=ge(S=>S.size),p=y.useMemo(()=>f?new Ee:new nt,[f]),[c]=y.useState(()=>new re),w=(n==null||(v=n[0])==null?void 0:v.length)===4?4:3,h=y.useMemo(()=>{const S=f?new se:new _e,_=e.map(g=>{const b=Array.isArray(g);return g instanceof U||g instanceof F?[g.x,g.y,g.z]:g instanceof be?[g.x,g.y,0]:b&&g.length===3?[g[0],g[1],g[2]]:b&&g.length===2?[g[0],g[1],0]:g});if(S.setPositions(_.flat()),n){t=16777215;const g=n.map(b=>b instanceof C?b.toArray():b);S.setColors(g.flat(),w)}return S},[e,f,n,w]);return y.useLayoutEffect(()=>{p.computeLineDistances()},[e,p]),y.useLayoutEffect(()=>{u?c.defines.USE_DASH="":delete c.defines.USE_DASH,c.needsUpdate=!0},[u,c]),y.useEffect(()=>()=>{h.dispose(),c.dispose()},[h]),y.createElement("primitive",de({object:p,ref:x},d),y.createElement("primitive",{object:h,attach:"geometry"}),y.createElement("primitive",de({object:c,attach:"material",color:t,vertexColors:!!n,resolution:[i.width,i.height],linewidth:(m=s??r)!==null&&m!==void 0?m:1,dashed:u,transparent:w===4},d)))}),rt="/Portfolio/faceid-photo.webp",Re=new C("#00d4ff"),q=new C("#35d3ac"),K=new C("#ff6b9d"),G=new C("#ffb347"),Y=new C("#ffffff"),je=new C("#e8e8e8"),z=[{type:"feature",label:"Input",sz:3,w:.06,slices:1,color:Re},{type:"feature",label:"Conv1",sz:3,w:.12,slices:2,color:q},{type:"feature",label:"Conv2",sz:3,w:.12,slices:2,color:q},{type:"feature",label:"Pool1",sz:1.5,w:.24,slices:4,color:K},{type:"feature",label:"Conv3",sz:1.5,w:.24,slices:4,color:q},{type:"feature",label:"Conv4",sz:1.5,w:.24,slices:4,color:q},{type:"feature",label:"Pool2",sz:.75,w:.48,slices:8,color:K},{type:"feature",label:"Conv5",sz:.75,w:.48,slices:8,color:q},{type:"feature",label:"Conv6",sz:.75,w:.48,slices:8,color:q},{type:"feature",label:"Pool3",sz:.375,w:.96,slices:16,color:K},{type:"fc",label:"FC-1",nodes:8,color:G},{type:"fc",label:"FC-2",nodes:6,color:G},{type:"out",label:"Out",nodes:2,color:Y}],Z=.32,it=.92,N=.11,M=.38;function ot(){var o,e;if(typeof window>"u")return!1;try{if((o=window.matchMedia)!=null&&o.call(window,"(prefers-reduced-motion: reduce)").matches)return!0;const t=navigator.hardwareConcurrency;if(typeof t=="number"&&t>0&&t<4)return!0;const n=navigator.deviceMemory;if(typeof n=="number"&&n>0&&n<4||(e=window.matchMedia)!=null&&e.call(window,"(pointer: coarse)").matches&&/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent||""))return!0}catch{}return!1}function ie(o){return 1+2.70158*Math.pow(o-1,3)+1.70158*Math.pow(o-1,2)}function Me(o){return Math.max(0,Math.min(1,o))}function ze(){const o=[];let e=0;z.forEach(m=>{o.push(e+(m.type==="feature"?m.w/2:N)),m.type==="feature"?e+=m.w+Z:e+=N*2+Z});const t=e-Z,n=o.map(m=>m-t/2),s=z.filter(m=>m.type==="feature"),r=z.filter(m=>m.type!=="feature"),f=Math.max(...s.map(m=>m.sz)),u=Math.max(0,...r.map(m=>(m.nodes-1)*M+N*2)),d=.22,x=Math.max(f,u)*Math.cos(d)+f*Math.sin(d)+.4,v=t+1;return{xs:n,totalW:t,rawW:v,rawH:x}}function Le({x:o,sz:e,flyInDelay:t=0,flyInDuration:n=1.4,reducedMotion:s=!1}){const[r,f]=y.useState(null),u=y.useRef(),d=y.useRef(0),x=y.useRef(!1);return y.useEffect(()=>{new Xe().load(rt,v=>{v.colorSpace=Je,f(v)})},[]),y.useEffect(()=>{if(s){x.current=!0;return}const v=setTimeout(()=>{x.current=!0},t*1e3);return()=>clearTimeout(v)},[t,s]),P((v,m)=>{if(s||!u.current||!x.current)return;d.current=Math.min(d.current+m/n,1);const i=ie(d.current);u.current.position.x=o*i;const p=1.6+(1-1.6)*i;u.current.scale.setScalar(p)}),l.jsxs("group",{ref:u,position:s?[o,0,0]:[0,0,0],scale:s?1:1.6,children:[l.jsxs("mesh",{children:[l.jsx("boxGeometry",{args:[.01,e,e]}),l.jsx("meshBasicMaterial",{color:Re,wireframe:!0,transparent:!0,opacity:.5})]}),r&&l.jsxs("mesh",{rotation:[0,Math.PI/2,0],children:[l.jsx("planeGeometry",{args:[e,e]}),l.jsx("meshBasicMaterial",{map:r,side:Ke,toneMapped:!1})]})]})}function Ae({fromX:o,toX:e,sliceThickness:t,sz:n,color:s,delay:r,reducedMotion:f=!1}){const u=y.useRef(),d=y.useRef(),x=y.useRef(0),[v,m]=y.useState(f);return y.useEffect(()=>{if(f){m(!0);return}const i=setTimeout(()=>m(!0),r*1e3);return()=>clearTimeout(i)},[r,f]),P((i,p)=>{if(f||!v||!u.current)return;x.current=Math.min(x.current+p/.5,1);const c=o+(e-o)*ie(x.current);u.current.position.x=c,d.current&&(d.current.position.x=c),u.current.material.opacity=Me(x.current*4),x.current>=1&&(u.current.material.emissiveIntensity=.18+.18*Math.abs(Math.sin(Date.now()*.0013)))}),v?l.jsxs(l.Fragment,{children:[l.jsxs("mesh",{ref:u,position:[f?e:o,0,0],children:[l.jsx("boxGeometry",{args:[t,n,n]}),l.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.25,transparent:!0,opacity:f?1:0,roughness:.3,metalness:.45})]}),l.jsxs("mesh",{ref:d,position:[f?e:o,0,0],children:[l.jsx("boxGeometry",{args:[t,n,n]}),l.jsx("meshBasicMaterial",{color:s,wireframe:!0,transparent:!0,opacity:.18})]})]}):null}function Te({layerDef:o,x:e,prevX:t,globalDelay:n,reducedMotion:s=!1}){const{sz:r,w:f,slices:u,color:d}=o,x=f/u*it,v=f/u,m=e-f/2+v/2;return l.jsx(l.Fragment,{children:Array.from({length:u},(i,p)=>{const c=m+p*v;return l.jsx(Ae,{fromX:t??c-2,toX:c,sliceThickness:x,sz:r,color:d,delay:n+p*.07,reducedMotion:s},p)})})}function oe({position:o,color:e,delay:t,nodeIdx:n,emissiveOverride:s=null,opacityScale:r=1,reducedMotion:f=!1}){const u=y.useRef(),d=y.useRef(0),[x,v]=y.useState(f);return y.useEffect(()=>{if(f){v(!0);return}const m=setTimeout(()=>v(!0),t*1e3);return()=>clearTimeout(m)},[t,f]),P((m,i)=>{if(f||!x||!u.current)return;d.current=Math.min(d.current+i/.38,1),u.current.scale.setScalar(ie(d.current)),u.current.material.opacity=Me(d.current*3)*r;const p=s??.35+.35*Math.abs(Math.sin(Date.now()*.0014+n*.7));d.current>=1&&(u.current.material.emissiveIntensity=p)}),x?l.jsxs("mesh",{ref:u,position:o,scale:f?1:0,children:[l.jsx("sphereGeometry",{args:[N,14,14]}),l.jsx("meshStandardMaterial",{color:e,emissive:e,emissiveIntensity:s??.4,transparent:!0,opacity:f?r:0,roughness:.3,metalness:.5})]}):null}function Ue({layerDef:o,x:e,layerIdx:t,globalDelay:n,reducedMotion:s=!1}){const{nodes:r,color:f}=o;return l.jsx(l.Fragment,{children:Array.from({length:r},(u,d)=>{const x=r-1-d;return l.jsx(oe,{position:[e,(d-(r-1)/2)*M,0],color:f,delay:n+x*.07,nodeIdx:d+t*10,reducedMotion:s},d)})})}function Oe({position:o,label:e,isKhang:t,delay:n,reducedMotion:s=!1}){const[r,f]=y.useState(s);return y.useEffect(()=>{if(s){f(!0);return}const u=setTimeout(()=>f(!0),(n+.45)*1e3);return()=>clearTimeout(u)},[n,s]),r?l.jsx(Qe,{position:o,center:!1,style:{pointerEvents:"none"},children:l.jsx("span",{style:{color:t?Y:je,fontSize:t?"clamp(12px, 1.8vw, 36px)":"clamp(9px, 1.4vw, 28px)",fontWeight:t?700:500,whiteSpace:"nowrap",opacity:t?1:.3,fontFamily:"monospace"},children:e})}):null}function Be({x:o,delay:e,reducedMotion:t=!1}){const n=[{label:"Khang",color:Y,emissive:1.2,opacityScale:1,y:+M/2},{label:"Not Khang",color:je,emissive:.08,opacityScale:.5,y:-M/2}];return l.jsx(l.Fragment,{children:n.map((s,r)=>l.jsxs("group",{children:[l.jsx(oe,{position:[o,s.y,0],color:s.color,delay:e+r*.15,nodeIdx:r+100,emissiveOverride:s.emissive,opacityScale:s.opacityScale,reducedMotion:t}),l.jsx(Oe,{position:[o+N+.15,s.y+.12,0],label:s.label,isKhang:r===0,delay:e+r*.15,reducedMotion:t})]},r))})}function De({fromX:o,toX:e,fromSz:t,toSz:n,color:s,delay:r,count:f=2}){const u=y.useRef([]),d=y.useRef(0),[x,v]=y.useState(!1),m=y.useMemo(()=>{const i=t/2,p=n/2,c=w=>(Math.random()*2-1)*w*.8;return Array.from({length:f},(w,h)=>({offset:-h/f,speed:.22+h%3*.04,fy:c(i),fz:c(i),ty:c(p),tz:c(p),lastT:1,fromHalf:i,toHalf:p}))},[f,t,n]);return y.useEffect(()=>{const i=setTimeout(()=>v(!0),r*1e3);return()=>clearTimeout(i)},[r]),P(({clock:i})=>{if(!x)return;d.current||(d.current=i.getElapsedTime());const p=i.getElapsedTime()-d.current;m.forEach((c,w)=>{const h=u.current[w];if(!h)return;const S=p*c.speed+c.offset,_=(S%1+1)%1;if(_<c.lastT){const b=B=>(Math.random()*2-1)*B*.8;c.fy=b(c.fromHalf),c.fz=b(c.fromHalf),c.ty=b(c.toHalf),c.tz=b(c.toHalf)}if(c.lastT=_,h.visible=S>=0,!h.visible)return;h.position.set(o+(e-o)*_,c.fy+(c.ty-c.fy)*_,c.fz+(c.tz-c.fz)*_);const g=_<.1?_/.1:_>.9?(1-_)/.1:1;h.material.opacity=g})}),x?l.jsx(l.Fragment,{children:m.map((i,p)=>l.jsxs("mesh",{ref:c=>u.current[p]=c,children:[l.jsx("sphereGeometry",{args:[.035,6,6]}),l.jsx("meshBasicMaterial",{color:s,transparent:!0,opacity:0})]},p))}):null}function Ce({fromXLeft:o,fromXRight:e,fromSz:t,sliceCount:n,toX:s,fcCount:r,color:f,delay:u,animated:d=!0,reducedMotion:x=!1}){const v=y.useRef([]),m=y.useRef(0),[i,p]=y.useState(x),c=y.useMemo(()=>{const h=t/2,S=(r-1)*M;return[{sx:o,sy:-h,sz:+h,tx:s,ty:-S/2,tz:0},{sx:o,sy:-h,sz:-h,tx:s,ty:-S/2,tz:0},{sx:e,sy:+h,sz:+h,tx:s,ty:+S/2,tz:0},{sx:e,sy:+h,sz:-h,tx:s,ty:+S/2,tz:0}]},[o,e,t,s,r]),w=y.useMemo(()=>{if(n<1)return[];const h=Math.min(2,n),S=g=>n===1?(o+e)/2:o+(e-o)*(g/(n-1)),_=g=>((n===1?.5:g/(n-1))*(r-1)-(r-1)/2)*M;return Array.from({length:h},(g,b)=>{const B=Math.floor(Math.random()*n);return{sx:S(B),ny:_(B),offset:-b/h,speed:.32,lastT:1}})},[n,r,o,e]);return y.useEffect(()=>{if(x){p(!0);return}const h=setTimeout(()=>p(!0),u*1e3);return()=>clearTimeout(h)},[u,x]),P(({clock:h})=>{if(x||!i||!d)return;m.current||(m.current=h.getElapsedTime());const S=h.getElapsedTime()-m.current,_=b=>n===1?(o+e)/2:o+(e-o)*(b/(n-1)),g=b=>((n===1?.5:b/(n-1))*(r-1)-(r-1)/2)*M;w.forEach((b,B)=>{const H=v.current[B];if(!H)return;const ae=S*b.speed+b.offset,O=(ae%1+1)%1;if(O<b.lastT){const ce=Math.floor(Math.random()*n);b.sx=_(ce),b.ny=g(ce)}if(b.lastT=O,H.visible=ae>=0,!H.visible)return;H.position.set(b.sx+(s-b.sx)*O,0+(b.ny-0)*O,0);const Ie=O<.1?O/.1:O>.9?(1-O)/.1:1;H.material.opacity=Ie})}),i?l.jsxs(l.Fragment,{children:[c.map((h,S)=>l.jsx(st,{points:[[h.sx,h.sy,h.sz],[h.tx,h.ty,h.tz]],color:f,lineWidth:1,dashed:!0,dashSize:.08,gapSize:.06,transparent:!0,opacity:.45},S)),d&&w.map((h,S)=>l.jsxs("mesh",{ref:_=>v.current[S]=_,children:[l.jsx("sphereGeometry",{args:[.04,6,6]}),l.jsx("meshBasicMaterial",{color:f,transparent:!0,opacity:0})]},`s-${S}`))]}):null}function ee({fromCount:o,toCount:e,fromX:t,toX:n,color:s,delay:r,reducedMotion:f=!1}){const[u,d]=y.useState(f);y.useEffect(()=>{if(f){d(!0);return}const v=setTimeout(()=>d(!0),r*1e3);return()=>clearTimeout(v)},[r,f]);const x=y.useMemo(()=>{const v=[];for(let m=0;m<o;m++)for(let i=0;i<e;i++)v.push(t,(m-(o-1)/2)*M,0,n,(i-(e-1)/2)*M,0);return new Float32Array(v)},[o,e,t,n]);return u?l.jsxs("lineSegments",{children:[l.jsx("bufferGeometry",{children:l.jsx("bufferAttribute",{attach:"attributes-position",array:x,count:x.length/3,itemSize:3})}),l.jsx("lineBasicMaterial",{color:s,transparent:!0,opacity:.16})]}):null}function te({fromCount:o,toCount:e,fromX:t,toX:n,delay:s,maxCount:r=2,toOutputOnly:f=!1,color:u=Y}){const d=(c,w)=>(c-(w-1)/2)*M,x=y.useMemo(()=>{const c=Math.min(r,o);return Array.from({length:c},(w,h)=>({fy:d(Math.floor(Math.random()*o),o),ty:f?+M/2:d(Math.floor(Math.random()*e),e),offset:-h/c,speed:.28+h*.04,lastT:1}))},[o,e,r,f]),v=y.useRef(0),m=y.useRef([]),[i,p]=y.useState(!1);return y.useEffect(()=>{const c=setTimeout(()=>p(!0),s*1e3);return()=>clearTimeout(c)},[s]),P(({clock:c})=>{if(!i)return;v.current||(v.current=c.getElapsedTime());const w=c.getElapsedTime()-v.current;x.forEach((h,S)=>{const _=m.current[S];if(!_)return;const g=w*h.speed+h.offset,b=(g%1+1)%1;b<h.lastT&&(h.fy=d(Math.floor(Math.random()*o),o),h.ty=f?+M/2:d(Math.floor(Math.random()*e),e)),h.lastT=b,_.visible=g>=0,_.visible&&(_.position.set(t+(n-t)*b,h.fy+(h.ty-h.fy)*b,0),_.material.emissiveIntensity=.6+.4*Math.sin(c.getElapsedTime()*5+S))})}),i?l.jsx(l.Fragment,{children:x.map((c,w)=>l.jsxs("mesh",{ref:h=>m.current[w]=h,children:[l.jsx("sphereGeometry",{args:[.033,7,7]}),l.jsx("meshStandardMaterial",{color:u,emissive:u,emissiveIntensity:1})]},w))}):null}function Pe({started:o,reducedMotion:e=!1}){const t=y.useRef(),{xs:n}=y.useMemo(()=>ze(),[]),s=y.useMemo(()=>e||ot(),[e]),r=y.useMemo(()=>{if(e)return z.map(()=>0);let i=.5;return z.map(p=>{const c=i;return i+=(p.type==="feature"?p.slices*.04:p.nodes*.035)+.1,c})},[e]),f=y.useMemo(()=>z.map((i,p)=>({...i,i:p})).filter(i=>i.type==="fc"||i.type==="out"),[]),u=f.filter(i=>i.type==="fc"),d=f.find(i=>i.type==="out"),x=u[u.length-1],v=y.useMemo(()=>{const i=z.map((p,c)=>({...p,i:c})).filter(p=>p.type==="feature");return i.slice(0,-1).map((p,c)=>[p,i[c+1]])},[]),m=y.useMemo(()=>{const i=z.map((c,w)=>({...c,i:w})).filter(c=>c.type==="feature"),p=z.map((c,w)=>({...c,i:w})).filter(c=>c.type!=="feature");return!i.length||!p.length?null:{from:i[i.length-1],to:p[0]}},[]);return P(({clock:i})=>{e||!t.current||(t.current.rotation.x=.18+Math.sin(i.getElapsedTime()*.08)*.04)}),l.jsxs("group",{ref:t,children:[o&&l.jsx(Le,{x:n[0],sz:z[0].sz,flyInDelay:0,flyInDuration:1.4,reducedMotion:e}),o&&z.map((i,p)=>i.type!=="feature"||p===0?null:l.jsx(Te,{layerDef:i,x:n[p],prevX:n[p-1],globalDelay:r[p],reducedMotion:e},p)),o&&l.jsxs(l.Fragment,{children:[u.map(({i,...p})=>l.jsx(Ue,{layerDef:p,x:n[i],layerIdx:i,globalDelay:r[i],reducedMotion:e},i)),d&&l.jsx(Be,{x:n[d.i],delay:r[d.i],reducedMotion:e}),u.slice(0,-1).map((i,p)=>{const c=u[p+1],w=r[c.i];return l.jsxs("group",{children:[l.jsx(ee,{fromCount:i.nodes,toCount:c.nodes,fromX:n[i.i],toX:n[c.i],color:G,delay:w,reducedMotion:e}),!s&&l.jsx(te,{fromCount:i.nodes,toCount:c.nodes,fromX:n[i.i],toX:n[c.i],delay:w+.2,maxCount:2,color:i.color})]},p)}),x&&d&&l.jsxs("group",{children:[l.jsx(ee,{fromCount:x.nodes,toCount:d.nodes,fromX:n[x.i],toX:n[d.i],color:G,delay:r[d.i],reducedMotion:e}),!s&&l.jsx(te,{fromCount:x.nodes,toCount:d.nodes,fromX:n[x.i],toX:n[d.i],delay:r[d.i]+.2,maxCount:2,toOutputOnly:!0,color:x.color})]}),m&&(()=>{const i=m.from,p=i.w/i.slices;return l.jsx(Ce,{fromXLeft:n[i.i]-i.w/2+p/2,fromXRight:n[i.i]+i.w/2-p/2,fromSz:i.sz,sliceCount:i.slices,toX:n[m.to.i],fcCount:m.to.nodes,color:G,delay:r[m.to.i],animated:!s,reducedMotion:e})})(),!s&&v.map(([i,p],c)=>l.jsx(De,{fromX:n[i.i]-i.w/2,toX:n[p.i]+p.w/2,fromSz:i.sz,toSz:p.sz,color:i.color,delay:r[p.i]+.5,count:2},c))]})]})}function at(){const{camera:o,size:e}=ge(),{rawW:t,rawH:n}=y.useMemo(()=>ze(),[]);return y.useLayoutEffect(()=>{const s=e.width/e.height,r=o.fov*Math.PI/180,f=n/2/Math.tan(r/2)/.8,u=t/2/(Math.tan(r/2)*s)/.8;o.position.set(0,0,Math.max(f,u)),o.lookAt(0,0,0),o.aspect=s,o.updateProjectionMatrix()},[o,e.width,e.height,t,n]),null}const ct=({phase:o,reducedMotion:e=!1})=>l.jsxs(Ye,{frameloop:e?"demand":"always",camera:{position:[0,0,20],fov:45},gl:{preserveDrawingBuffer:!0,alpha:!0,antialias:!0},style:{background:"transparent",width:"100%",height:"100%"},children:[l.jsx("ambientLight",{intensity:.55}),l.jsx("pointLight",{position:[6,6,6],intensity:1.2}),l.jsx("pointLight",{position:[-6,-4,-6],intensity:.45,color:"#35d3ac"}),l.jsx("directionalLight",{position:[0,5,3],intensity:.55}),l.jsx(at,{}),l.jsx(Pe,{started:o==="cnn",reducedMotion:e}),l.jsx(Ze,{enableZoom:!1,enablePan:!1,enableRotate:o==="cnn",rotateSpeed:.55}),l.jsx($e,{all:!0})]}),qe=a.shape({type:a.string,label:a.string,sz:a.number,w:a.number,slices:a.number,nodes:a.number,color:a.object});Le.propTypes={x:a.number.isRequired,sz:a.number.isRequired,flyInDelay:a.number,flyInDuration:a.number,reducedMotion:a.bool};Ae.propTypes={fromX:a.number.isRequired,toX:a.number.isRequired,sliceThickness:a.number.isRequired,sz:a.number.isRequired,color:a.object.isRequired,delay:a.number.isRequired,reducedMotion:a.bool};Te.propTypes={layerDef:qe.isRequired,x:a.number.isRequired,prevX:a.number,globalDelay:a.number.isRequired,reducedMotion:a.bool};oe.propTypes={position:a.arrayOf(a.number).isRequired,color:a.object.isRequired,delay:a.number.isRequired,nodeIdx:a.number.isRequired,emissiveOverride:a.number,opacityScale:a.number,reducedMotion:a.bool};Ue.propTypes={layerDef:qe.isRequired,x:a.number.isRequired,layerIdx:a.number.isRequired,globalDelay:a.number.isRequired,reducedMotion:a.bool};Oe.propTypes={position:a.arrayOf(a.number).isRequired,label:a.string.isRequired,isKhang:a.bool,delay:a.number.isRequired,reducedMotion:a.bool};Be.propTypes={x:a.number.isRequired,delay:a.number.isRequired,reducedMotion:a.bool};De.propTypes={fromX:a.number.isRequired,toX:a.number.isRequired,fromSz:a.number.isRequired,toSz:a.number.isRequired,color:a.object.isRequired,delay:a.number.isRequired,count:a.number};Ce.propTypes={fromXLeft:a.number.isRequired,fromXRight:a.number.isRequired,fromSz:a.number.isRequired,sliceCount:a.number.isRequired,toX:a.number.isRequired,fcCount:a.number.isRequired,color:a.object.isRequired,delay:a.number.isRequired,animated:a.bool,reducedMotion:a.bool};ee.propTypes={fromCount:a.number.isRequired,toCount:a.number.isRequired,fromX:a.number.isRequired,toX:a.number.isRequired,color:a.object.isRequired,delay:a.number.isRequired,reducedMotion:a.bool};te.propTypes={fromCount:a.number.isRequired,toCount:a.number.isRequired,fromX:a.number.isRequired,toX:a.number.isRequired,delay:a.number.isRequired,maxCount:a.number,toOutputOnly:a.bool,color:a.object};Pe.propTypes={started:a.bool.isRequired,reducedMotion:a.bool};ct.propTypes={phase:a.oneOf(["intro","cnn"]).isRequired,reducedMotion:a.bool};export{ct as default};
