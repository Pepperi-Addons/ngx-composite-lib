import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
//import { CommonModule } from '@angular/common';
import { PepGenericFormModule } from './generic-form.module';
import { GenericFormComponent } from './generic-form.component';
import { PepNgxHelperModule } from '../src/core/common/modules/ngx-helper-module';


//import { SBNgxHelperModule } from '@storybook-settings/typings/';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            imports: [
                PepGenericFormModule,
                PepNgxHelperModule
            ]
        })
    ],
    title: 'Components/GenericForm',
    component: GenericFormComponent,
    argTypes: {
        dataView: {
            description: 'Form\'s data view',
            defaultValue: {
                Type: 'Form',
                Hidden: false,
                Columns: [],
                Context: {
                    Object: {
                        Resource: 'transactions',
                        InternalID: 0,
                        Name: 'Object Name'
                    },
                    Name: 'Context Name',
                    ScreenSize: 'Tablet',
                    Profile: {
                        InternalID: 0,
                        Name: 'Profile Name'
                    }
                },
                Fields: [
                    {
                        FieldID: 'GeneralInformation',
                        Type: 'Separator',
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
                        }
                    },
                    {
                        FieldID: 'ItemExternalID',
                        Type: 'TextBox',
                        Title: 'Item Code',
                        Mandatory: true,
                        ReadOnly: false,
                        Layout: {
                            Origin: {
                                X: 0,
                                Y: 1
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
                        Type: 'DateAndTime',
                        Title: 'Action Date Time',
                        Mandatory: false,
                        ReadOnly: false,
                        Layout: {
                            Origin: {
                                X: 1,
                                Y: 1
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
                    }
                ],
                Rows: []
            },
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: 'IPepGenericFormDataView'
                }
            }
        },
        dataSource: {
            description: 'Form\'s data. provided as object properties representing FieldID and value',
            defaultValue: {
                ItemExternalID: 'Example value'
            },
            control: 'object',
            table: {
                type: {
                    summary: 'any'
                }
            }
        },
        isLocked: {
            description: 'Whether the list is disabled',
            defaultValue: false,
            control: 'boolean',
        },
        inline: {
            description: 'Whether the component is inline. when inline is set to true, the container width and height have to be set manually',
            defaultValue: false,
            control: 'boolean',
        },
        showTopBar: {
            description: 'Whether the top bar is displayed',
            defaultValue: false,
            control: 'boolean',
        },
        addPadding: {
            description: 'Whether the container has padding',
            defaultValue: false,
            control: 'boolean',
        },
        valueChange: {
            action: 'valueChange',
            description: 'Emits a change event whenever a value is changed',
            control: false,
            table: {
                type: {
                    summary: 'EventEmitter<IPepGenericFormValueChange>'
                }
            }
        },
        fieldClick: {
            action: 'fieldClick',
            description: 'Emits a click event whenever a field is clicked',
            control: false,
            table: {
                type: {
                    summary: 'EventEmitter<IPepGenericFormValueChange>'
                }
            }
        },
        formValidationChange: {
            action: 'formValidationChange',
            description: 'Event emitted whenever the form is changed indicating whether the form is valid',
            control: false,
            table: {
                type: {
                    summary: 'EventEmitter<boolean>'
                }
            }
        } 
    },
    parameters: {
        controls: {
            include: [
                'dataView',
                'dataSource',
                'isLocked',
                'inline',
                'showTopBar',
                'addPadding',
                'valueChange',
                'fieldClick',
                'formValidationChange'
            ],
        },
    }

} as Meta;

const Template: Story<GenericFormComponent> = (args: GenericFormComponent) => ({
    props: {
        ...args,
        valueChange: action('valueChange'),
        fieldClick: action('fieldClick'),
        formValidationChange: action('formValidationChange')
    }
});

export const Base = Template.bind({});
Base.args = {}

