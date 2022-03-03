import { FormDataView, BaseFormDataViewField } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

export const FakeDataViewFields: BaseFormDataViewField[] = [
    {
        FieldID: 'ExternalID',
        Type: 'TextBox',
        Title: 'External ID',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 0
            },
            Size: {
                Width: 1,
                Height: 1
            }
        }
    },
    {
        FieldID: 'ActionDateTime',
        Type: 'DateAndTime',
        Title: 'Action Date Time',
        Mandatory: false,
        ReadOnly: true,
        Layout: {
            Origin: {
                X: 1,
                Y: 0
            },
            Size: {
                Width: 1,
                Height: 1
            }
        }
    },
    {
        FieldID: 'DeliveryDate',
        Type: 'DateAndTime',
        Title: 'Delivery Date',
        Mandatory: false,
        ReadOnly: false,
        Layout: {
            Origin: {
                X: 0,
                Y: 1
            },
            Size: {
                Width: 2,
                Height: 1
            }
        }
    }
];

export const FakeData = [
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "ExternalID",
        BackgroundColor: "",
        Enabled: false,
        EventsData: null,
        FieldType: 1,
        FormattedValue: "",
        GroupFields: null,
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: 5,
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
        Enabled: false,
        EventsData: null,
        FieldType: 6,
        FormattedValue: "11/22/2021 11:26 AM",
        GroupFields: null,
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: 0,
        TextColor: "",
        UiPageKey: "",
        Value: "2021-11-22T09:26:02Z",
        Visible: true,
    },
    {
        Accessory: "",
        AdditionalValue: "",
        ApiName: "DeliveryDate",
        BackgroundColor: "",
        Enabled: true,
        EventsData: null,
        FieldType: 5,
        FormattedValue: "11/22/2021",
        GroupFields: null,
        Highlighted: false,
        NotificationInfo: "",
        OptionalValues: [],
        ReferenceObjectInternalType: "",
        ReferenceObjectSubType: "",
        ReferenceObjectType: -1439077855,
        TextColor: "",
        UiPageKey: "",
        Value: "2021-11-22",
        Visible: true
    }
]