import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';
import {

    ObjectsDataRowCell,

} from '@pepperi-addons/ngx-lib';



export const FakeData: any = {
    GeneralInformation: 'Rich Text Example',
    //  ItemExternalID: 'Abcd',
    ActionDateTime: '2021-11-22T09:26:02Z',
    WrntyID: '272764514',
    TSATsaTextTest: 'Some text',
    DeliveryDate: '2021-11-22',
    AccountInformation: '',
    BranchDbId: '1',
    BillToName: 'AD',
    ShipToName: 'Someone',
    /*BillToAddress: {
        Value: 'Israel',
        GroupFields: [
            {
                ShipToCountryIso: {
                    Value: 'IL',
                    OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "UIsrael" }],
                }
            },
            { ShipToStateIso: '' },
            { ShipToCity: '' },
            { ShipToStreet: '' },
            { ShipToZipCode: '' }

        ]
    }, 

    ItemName: {
        Value: 'abc',
        OptionalValues: [{ Key: 'a', Value: 1 }, { Key: 'b', Value: 2 }]
    }, */
    UnitsQuantity: 10000,
    TotalUnitsPriceAfterDiscount: 20000,
    TSASetPriceForHardContract: 'high price',
    TSALabels: null,
    TSALabelQty: 0,
    TSALabelCode: '',
    TSABagsQty: 4,
    TSAAmountPerBag: 999,
    TSABagPrevValue: 7,
    ItemTSAPackAllIn1Bag: 'all-pack'

}

export const FakeDataViewFields: any[] = [
    {
        FieldID: 'GeneralInformation',
        Type: 'RichTextHTML',
        Title: 'General Information',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 0
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        },
        AdditionalProps: {
            renderTitle: false,
            renderEnlargeButton: false
        }
    },
    {
        FieldID: 'GeneralInformationTwo',
        Type: 'TextHeader',
        Title: 'Description',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 1
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },


    {
        FieldID: 'WrntyID',
        Type: 'LimitedLengthTextBox',
        Title: 'ID',
        Mandatory: false,
        ReadOnly: true,
        Layout: {
            Origin: {
                X: 0,
                Y: 2
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSATsaTextTest',
        Type: 'TextBox',
        Title: 'TSA Tsa Text Test',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 1,
                Y: 2
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSATsaTextTest2',
        Type: 'TextBox',
        Title: 'TSA Tsa Text Test',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 2,
                Y: 2
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSATsaTextTest3',
        Type: 'TextBox',
        Title: 'TSA Tsa Text Test',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 3,
                Y: 2
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSATsaTextTest4',
        Type: 'TextBox',
        Title: 'TSA Tsa Text Test',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 4,
                Y: 2
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'ActionDateTime',
        Type: 'Date',
        Title: 'Action DateTime',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 1,
                Y: 3
            },
            Size: {
                Width: 3,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'AccountInformation',
        Type: 'Separator',
        Title: 'Account Information',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 4
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'BranchDbId',
        Type: 'MultiTickBox',
        Title: 'Branch Db Id',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 5
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        },
        OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "Israel" }],
    },
    {
        FieldID: 'BillToName',
        Type: 'MultipleStringValues',
        Title: 'Bill To Name',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 1,
                Y: 5
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        },
        OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "Israel" }],
        AdditionalProps: { emptyOption: false }
    },
    {
        FieldID: 'ShipToName',
        Type: 'TextBox',
        Title: 'Ship To Name',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 1,
                Y: 6
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        },
        AdditionalProps: { regex: /^[0-9]*$/}
    },
    {
        FieldID: 'BillToAddress',
        Type: 'Address',
        Title: 'Bill To Address',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 7
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'ShipToAddress',
        Type: 'Address',
        Title: 'Ship To Address',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 1,
                Y: 7
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'BillToPhone',
        Type: 'TextBox',
        Title: 'Bill To Phone',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 10
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'ShipToPhone',
        Type: 'TextBox',
        Title: 'Ship To Phone',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 1,
                Y: 10
            },
            Size: {
                Width: 1,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'OrderInformation',
        Type: 'Separator',
        Title: 'SOrder In formation',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 11
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSAImage1',
        Type: 'Image',
        Title: 'Image1',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 12
            },
            Size: {
                Width: 2,
                Height: 4
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSAmulti',
        Type: 'MultiTickBox',
        Title: 'TSA multi',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 16
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSADropdown2',
        Type: 'MultipleStringValues',
        Title: 'TSA Dropdown new',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 17
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        },
        OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "Israel" }]
    },
    {
        FieldID: 'AccountTSAAccountDropdown',
        Type: 'ComboBox',
        Title: 'Account TSA Account Dropdown',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 18
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSACalculatedNumberbilltocountry',
        Type: 'NumberInteger',
        Title: 'TSA Calculated Number bill to country',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 19
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSAUDTTEST',
        Type: 'TextArea',
        Title: 'TSAUDTTEST',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 20
            },
            Size: {
                Width: 2,
                Height: 2
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    }, {
        FieldID: 'TSAUDTtesttest',
        Type: 'TextBox',
        Title: 'TSA UDT test test',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 22
            },
            Size: {
                Width: 2,
                Height: 0
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'Signature',
        Type: 'Signature',
        Title: 'Signature',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 23
            },
            Size: {
                Width: 2,
                Height: 2
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },
    {
        FieldID: 'TSAsignaturetest',
        Type: 'Signature',
        Title: 'TS Asignature test',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 25
            },
            Size: {
                Width: 2,
                Height: 2
            }
        },
        Style: {
            Alignment: {
                Horizontal: 'Stretch',
                Vertical: 'Stretch'
            }
        }
    },

];

export const FakeDataOld: ObjectsDataRowCell[] = [
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "GeneralInformation",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 13,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '2',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "ExternalID",
        BackgroundColor: "",
        Enabled: false,
        FieldType: 1,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "ActionDateTime",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 6,
        FormattedValue: "11/22/2021 11:26 AM",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '607483216',
        TextColor: "",
        UiPageKey: "",
        Value: "2021-11-22T09:26:02Z",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "WrntyID",
        BackgroundColor: "",
        Enabled: false,
        FieldType: 2,
        FormattedValue: "272764514",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '607492672',
        TextColor: "",
        UiPageKey: "",
        Value: "272764514",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSATsaTextTest",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 1,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '1610126992',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "DeliveryDate",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 5,
        FormattedValue: "11/22/2021",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "2021-11-22",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "AccountInformation",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 13,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '607499200',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "BranchDbId",
        BackgroundColor: "",
        Enabled: false,
        FieldType: 16,
        FormattedValue: "12234566686869",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '-1',
        TextColor: "",
        UiPageKey: "",
        Value: "1",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "BillToName",
        BackgroundColor: "",
        Enabled: false,
        FieldType: 1,
        FormattedValue: "12234566686869",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '-1',
        TextColor: "",
        UiPageKey: "",
        Value: "12234566686869",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "ShipToName",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 1,
        FormattedValue: "12234566686869",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '-1',
        TextColor: "",
        UiPageKey: "",
        Value: "12234566686869",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "BillToAddress",
        BackgroundColor: "",
        Enabled: false,
        FieldType: 14,
        FormattedValue: "Israel",
        GroupFields: [
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "BillToCountryIso",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 16,
                FormattedValue: "Israel",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "Israel" }],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '1505137882',
                TextColor: "",
                UiPageKey: "",
                Value: "IL",
                Visible: true,
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "BillToStateIso",
                BackgroundColor: "",
                Enabled: false,
                FieldType: 16,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '1585223436',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true,
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "BillToCity",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 1,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '607497088',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "BillToStreet",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 1,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '0',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true,
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "BillToZipCode",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 1,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '1525717912',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true
            }
        ],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "Israel",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "ShipToAddress",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 14,
        FormattedValue: "Israel",
        GroupFields: [
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "ShipToCountryIso",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 16,
                FormattedValue: "Israel",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [{ Key: "AD", Value: "Andorra" }, { Key: "IL", Value: "UIsrael" }],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '-1',
                TextColor: "",
                UiPageKey: "",
                Value: "IL",
                Visible: true
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "ShipToStateIso",
                BackgroundColor: "",
                Enabled: false,
                FieldType: 16,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '0',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "ShipToCity",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 1,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '0',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "ShipToStreet",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 1,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '0',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true
            },
            {
                Accessory: "",
                AdditionalValue: "",
                ApiName: "ShipToZipCode",
                BackgroundColor: "",
                Enabled: true,
                FieldType: 1,
                FormattedValue: "",
                GroupFields: [],
                Highlighted: false,
                NotificationInfo: "",
                OptionalValues: [],
                ReferenceObjectInternalType: "",
                ReferenceObjectSubType: "",
                ReferenceObjectType: '1530042974',
                TextColor: "",
                UiPageKey: "",
                Value: "",
                Visible: true
            }
        ],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '-1',
        TextColor: "",
        UiPageKey: "",
        Value: "Israel",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "BillToPhone",
        BackgroundColor: "",
        Enabled: false,
        FieldType: 1,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "ShipToPhone",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 1,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "OrderInformation",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 13,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSAImage1",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 20,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSAmulti",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 12,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [{ Key: "ACV", Value: "ACV" }, { Key: "123", Value: "123" }, { Key: "DFGH", Value: "DFGH" }],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSADropdown",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 11,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [{ Key: "1", Value: "1" }, { Key: "23", Value: "23" }, { Key: "4", Value: "4" }, { Key: "5", Value: "5" }],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "AccountTSAAccountDropdown",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 11,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [{ Key: "A", Value: "A" }, { Key: "B", Value: "B" }, { Key: "C", Value: "C" }, { Key: "D", Value: "D" }],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSACalculatedNumberbilltocountry",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 7,
        FormattedValue: "1",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "1",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSAUDTTEST",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 3,
        FormattedValue: "{\"success\":true}",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "{\"success\":true}",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSAUDTtesttest",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 1,
        FormattedValue: "Jfnfhdhdhfhfhfhfhf",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "Jfnfhdhdhfhfhfhfhf",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "Signature",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 25,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '2',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "TSAsignaturetest",
        BackgroundColor: "",
        Enabled: true,
        FieldType: 25,
        FormattedValue: "",
        GroupFields: [],
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: '0',
        TextColor: "",
        UiPageKey: "",
        Value: "",
        Visible: true
    }
]

export const uiControlData: any = {
    Type: 'Form',
    // Columns: 2,
    ControlFields: [{
        ApiName: "GeneralInformation",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "",
        FieldType: 13,
        Layout: { Height: 1, LineNumber: 0, Width: 2, X: 0, XAlignment: 0, Y: 0, YAlignment: 3 },
        Height: 1,
        LineNumber: 0,
        Width: 2,
        X: 0,
        XAlignment: 0,
        Y: 0,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 100,
        MinValue: 0,
        ReadOnly: false,
        Title: "General Information"
    },
    {
        ApiName: "ExternalID",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "External ID",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 1, Width: 1, X: 0, XAlignment: 0, Y: 1, YAlignment: 3 },
        Height: 1,
        LineNumber: 1,
        Width: 1,
        X: 0,
        XAlignment: 0,
        Y: 1,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: true,
        Title: "External ID"
    },
    {
        ApiName: "ActionDateTime",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Action Time",
        FieldType: 6,
        Layout: { Height: 1, LineNumber: 1, Width: 1, X: 1, XAlignment: 0, Y: 1, YAlignment: 3 },
        Height: 1,
        LineNumber: 1,
        Width: 1,
        X: 1,
        XAlignment: 0,
        Y: 1,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Action Time"
    },
    {
        ApiName: "WrntyID",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "ID",
        FieldType: 2,
        Layout: { Height: 1, LineNumber: 2, Width: 1, X: 0, XAlignment: 0, Y: 2, YAlignment: 3 },
        Height: 1,
        LineNumber: 2,
        Width: 1,
        X: 0,
        XAlignment: 0,
        Y: 2,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: true,
        Title: "ID"
    },
    {
        ApiName: "TSATsaTextTest",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "TsaTextTest",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 2, Width: 1, X: 1, XAlignment: 0, Y: 2, YAlignment: 3 },
        Height: 1,
        LineNumber: 2,
        Width: 1,
        X: 1,
        XAlignment: 0,
        Y: 2,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "TsaTextTest"
    },
    {
        ApiName: "DeliveryDate",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "Delivery Date",
        FieldType: 5,
        Layout: { Height: 1, LineNumber: 3, Width: 2, X: 0, XAlignment: 0, Y: 3, YAlignment: 3 },
        Height: 1,
        LineNumber: 3,
        Width: 2,
        X: 0,
        XAlignment: 0,
        Y: 3,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Delivery Date"
    },
    {
        ApiName: "AccountInformation",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "",
        FieldType: 13,
        Layout: { Height: 1, LineNumber: 4, Width: 2, X: 0, XAlignment: 0, Y: 4, YAlignment: 3 },
        Height: 1,
        LineNumber: 4,
        Width: 2,
        X: 0,
        XAlignment: 0,
        Y: 4,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 100,
        MinValue: 0,
        ReadOnly: false,
        Title: "Account Information"
    },
    {
        ApiName: "BranchDbId",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Branch",
        FieldType: 16,
        Layout: { Height: 1, LineNumber: 5, Width: 1, X: 1, XAlignment: 0, Y: 5, YAlignment: 3 },
        Height: 1,
        LineNumber: 5,
        Width: 1,
        X: 1,
        XAlignment: 0,
        Y: 5,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Branch"
    },
    {
        ApiName: "BillToName",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Bill to Name",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 6, Width: 1, X: 0, XAlignment: 0, Y: 6, YAlignment: 3 },
        Height: 1,
        LineNumber: 6,
        Width: 1,
        X: 0,
        XAlignment: 0,
        Y: 6,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: true,
        Title: "Bill to Name"
    },
    {
        ApiName: "ShipToName",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Ship to Name",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 6, Width: 1, X: 1, XAlignment: 0, Y: 6, YAlignment: 3 },
        Height: 1,
        LineNumber: 6,
        Width: 1,
        X: 1,
        XAlignment: 0,
        Y: 6,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Ship to Name"
    },
    {
        ApiName: "BillToAddress",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Bill to Address",
        FieldType: 14,
        Layout: { Height: 2, LineNumber: 7, Width: 1, X: 0, XAlignment: 0, Y: 7, YAlignment: 3 },
        Height: 2,
        LineNumber: 7,
        Width: 1,
        X: 0,
        XAlignment: 0,
        Y: 7,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: true,
        Title: "Bill to Address"
    },
    {
        ApiName: "ShipToAddress",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Ship to Address",
        FieldType: 14,
        Layout: { Height: 2, LineNumber: 7, Width: 1, X: 1, XAlignment: 0, Y: 7, YAlignment: 3 },
        Height: 2,
        LineNumber: 7,
        Width: 1,
        X: 1,
        XAlignment: 0,
        Y: 7,
        YAlignment: 3,
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Ship to Address"
    },
    {
        ApiName: "BillToPhone",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Bill to Phone",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 8, Width: 1, X: 0, XAlignment: 0, Y: 10, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: true,
        Title: "Bill to Phone",
    },
    {
        ApiName: "ShipToPhone",
        ColumnWidth: 1,
        ColumnWidthType: 0,
        FieldName: "Ship to Phone",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 8, Width: 1, X: 1, XAlignment: 0, Y: 10, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Ship to Phone"
    },
    {
        ApiName: "OrderInformation",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "",
        FieldType: 13,
        Layout: { Height: 1, LineNumber: 9, Width: 2, X: 0, XAlignment: 0, Y: 11, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 100,
        MinValue: 0,
        ReadOnly: false,
        Title: "Order Information"
    },
    {
        ApiName: "TSAImage1",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "Image1",
        FieldType: 20,
        Layout: { Height: 4, LineNumber: 10, Width: 2, X: 0, XAlignment: 0, Y: 12, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Image1"
    },
    {
        ApiName: "TSAmulti",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "multi",
        FieldType: 12,
        Layout: { Height: 1, LineNumber: 11, Width: 2, X: 0, XAlignment: 0, Y: 16, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "multi",
    },
    {
        ApiName: "TSADropdown",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "Dropdown",
        FieldType: 11,
        Layout: { Height: 1, LineNumber: 12, Width: 2, X: 0, XAlignment: 0, Y: 17, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Dropdown"
    },
    {
        ApiName: "AccountTSAAccountDropdown",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "Account Account Dropdown",
        FieldType: 11,
        Layout: { Height: 1, LineNumber: 13, Width: 2, X: 0, XAlignment: 0, Y: 18, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Account Dropdown"
    },
    {
        ApiName: "TSACalculatedNumberbilltocountry",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "Calculated Number bill to country",
        FieldType: 7,
        Layout: { Height: 1, LineNumber: 14, Width: 2, X: 0, XAlignment: 0, Y: 19, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Calculated Number bill to country"
    },
    {
        ApiName: "TSAUDTTEST",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "UDT TEST",
        FieldType: 3,
        Layout: { Height: 2, LineNumber: 15, Width: 2, X: 0, XAlignment: 0, Y: 20, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "UDT TEST"
    },
    {
        ApiName: "TSAUDTtesttest",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "UDTtesttest",
        FieldType: 1,
        Layout: { Height: 1, LineNumber: 16, Width: 2, X: 0, XAlignment: 0, Y: 22, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "UDTtesttest"
    },
    {
        ApiName: "Signature",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "Signature",
        FieldType: 25,
        Layout: { Height: 2, LineNumber: 17, Width: 2, X: 0, XAlignment: 0, Y: 23, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "Signature"
    },
    {
        ApiName: "TSAsignaturetest",
        ColumnWidth: 2,
        ColumnWidthType: 0,
        FieldName: "signaturetest",
        FieldType: 25,
        Layout: { Height: 2, LineNumber: 18, Width: 2, X: 0, XAlignment: 0, Y: 25, YAlignment: 3 },
        Mandatory: false,
        MaxFieldCharacters: 0,
        MaxFieldLines: 0,
        MaxValue: 1000000000,
        MinValue: -1000000000,
        ReadOnly: false,
        Title: "signaturetest"
    }
    ]
}