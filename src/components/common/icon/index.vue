<script>
import { h, resolveDynamicComponent } from 'vue'
function Icons(props,ctx) {
  const Component = resolveDynamicComponent(`${props.icon}`)
  return h(Component,{size:props.size})
}
export default Icons
</script>