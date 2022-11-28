<template>
    <a-drawer
        v-model:visible="visible"
        title="请输入内容"
        width="720"
        :closable="false"
        placement="left"
        :header-style="{ height: '40px' }"
        :footer-style="{ textAlign: 'right', padding: '8px' }"
        :body-style="{ padding: '5px 10px', marginBottom: '49px' }"
    >
        <div class="main_area">
            <!-- 表单区域 -->
            <a-form
                ref="formRef"
                :model="form"
                :rules="rules"
                layout="vertical"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-row :gutter="16">
                    <!-- 日期选择 -->
                    <a-col :span="12">
                        <a-form-item has-feedback label="日期:" name="date">
                            <a-date-picker
                                :locale="locale"
                                v-model:value="form.date"
                                style="width: 100%"
                                placeholder="选择日期"
                                value-format="YYYY-MM-DD"
                                :get-popup-container="
                                    (trigger) => trigger.parentElement
                                "
                            />
                        </a-form-item>
                    </a-col>
                    <!-- 体重 -->
                    <a-col :span="12">
                        <a-form-item
                            has-feedback
                            label="体重(kg):"
                            name="weight"
                        >
                            <a-input
                                v-model:value.number.trim="form.weight"
                                placeholder="输入体重"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <!-- 训练类型 -->
                    <a-col :span="12">
                        <a-form-item
                            has-feedback
                            label="训练类型:"
                            name="training"
                        >
                            <a-select
                                v-model:value="form.training"
                                mode="multiple"
                                placeholder="选择训练类型"
                                :options="trainingType"
                                @change="handleChange"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                    <!-- 运动时长 -->
                    <a-col :span="12">
                        <a-form-item
                            has-feedback
                            label="运送时长(min):"
                            name="sportTime"
                        >
                            <a-input
                                v-model:value.number.trim="form.sportTime"
                                placeholder="输入运动时长"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <!-- 热量 -->
                    <a-col :span="12">
                        <a-form-item
                            has-feedback
                            label="热量(kcal)："
                            name="caloric"
                        >
                            <a-input
                                v-model:value.number.trim="form.caloric"
                                placeholder="输入热量"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <!-- 底部按钮控件 -->
                <div class="drawer_bottom">
                    <a-button style="margin-right: 8px" @click="resetForm">
                        重置
                    </a-button>
                    <a-button
                        type="primary"
                        html-type="submit"
                        :loading="submitLoading"
                    >
                        提交
                    </a-button>
                </div>
            </a-form>
            <!-- 表格区域 -->
            <div class="table_area">
                <Table></Table>
            </div>
        </div>
    </a-drawer>
</template>

<script setup>
const Table = defineAsyncComponent(() => import("./health/BaseTable.vue"))

const props = defineProps(["visible"])
const emit = defineEmits(["update:visible"])

const visible = computed({
    get() {
        return props.visible
    },
    set(newVal) {
        emit("update:visible", newVal)
    },
})

// 表单逻辑
const {
    rules,
    trainingType,
    handleChange,
    onFinish,
    onFinishFailed,
    resetForm,
    locale,
    form,
    formRef,
    submitLoading,
} = useForm()
</script>

<style scoped lang="scss">
.drawer_bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 720px;
    border-top: 1px solid #e9e9e9;
    padding: 8px 16px;
    background: #fff;
    text-align: right;
    z-index: 1;
}

.main_area {
    width: 100%;
    height: auto;
    // display: flex;
    // flex-direction: column;

    .table_area {
        width: 100%;
    }
}
</style>
