import * as yup from "yup";

yup.setLocale({
    mixed: {
        required: ({ label }) => `${label} Wajib diisi`,
    },
});

const schema = yup.object({
    univName: yup.string().required().label("Nama Universitas"),
    univAccreditation: yup.string().required().label("Akreditasi Universitas"),
    univType: yup.string().required().label("Jenis Universitas"),
    // univAddress: yup.string().required().label("Alamat Universitas"),

    univNationalRank: yup
        .string()
        .required()
        .label("Rangking Nasional Universitas"),
    univInternationalRank: yup
        .string()
        .required()
        .label("Rangking Internasional Universitas"),
    // univVisionMission: yup
    //     .string()
    //     .required()
    //     .label("Visi dan Misi Universitas"),
});

export default schema;
