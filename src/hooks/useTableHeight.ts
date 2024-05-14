import {ref, onMounted, onUnmounted} from 'vue';

export function useTableHeight() {

    const tableHeight = ref(0);

    const calculateTableHeight = () => {
        const availableHeight = window.innerHeight;
        const headerHeight = 55; // 假设顶部导航栏高度为55px
        const footerHeight = 50; // 假设底部工具栏高度为50px
        tableHeight.value = availableHeight - headerHeight - footerHeight - 100;
    };

    // 在组件挂载时计算表格高度
    onMounted(() => {
        calculateTableHeight();
        window.addEventListener('resize', calculateTableHeight);
    });

    // 在组件销毁前移除窗口尺寸变化的监听器
    onUnmounted(() => {
        window.removeEventListener('resize', calculateTableHeight);
    });

    return {
        tableHeight
    };
}
