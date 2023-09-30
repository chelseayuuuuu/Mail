import { onMounted, ref } from "vue";
import { getCategoryAPI } from "@/apis/category";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };

  onMounted(() => {
    getCategory();
  });

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}
