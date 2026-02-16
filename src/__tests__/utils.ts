import { cx } from "../utils";

test("cx (merges class names correctly)", () => {
    const result = cx(
        "btn",
        "btn",
        "btn-primary",
        { active: true, disabled: false },
        ["extra", { visible: true, hidden: false }],
        null,
        undefined,
        false,
        0,
        -123,
        ["nested", ["deeplyNested", { deep: true }]],
        { tested: undefined }
    );

    expect(result).toBe(
        "btn btn-primary active extra visible 0 -123 nested deeplyNested deep"
    );
});
